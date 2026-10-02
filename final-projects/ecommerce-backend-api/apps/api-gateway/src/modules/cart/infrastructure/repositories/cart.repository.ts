import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from '../entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItemEntity } from '../entities/cart-item.entity';
import { CartDomain } from '../../domain/cart.domain';
import { CartMapper } from '../../mappers/cart.mapper';
import { ProductEntity } from '../../../products/infrastructure/entities/product.entity';
import { UserEntity } from '../../../user/infrastructure/entities/user.entity';

@Injectable()
export class CartRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,

    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>,
  ) {}

  //FIND CART BY USER ID
  async findCartByUserId(userId: string): Promise<CartDomain | null> {
    const cart = await this.cartRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },

      relations: {
        user: true,
        items: {
          product: true,
        },
      },
    });

    return cart ? CartMapper.toDomain(cart) : null;
  }

  //ADD ITEM
  async addItem(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<CartDomain> {
    let cart = await this.cartRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },

      relations: {
        user: true,
        items: {
          product: true,
        },
      },
    });

    if (!cart) {
      const user = new UserEntity();

      user.id = userId;

      cart = this.cartRepository.create({
        user,
      });

      cart = await this.cartRepository.save(cart);
    }

    let item = await this.cartItemRepository.findOne({
      where: {
        cart: {
          id: cart.id,
        },

        product: {
          id: productId,
        },
      },

      relations: {
        cart: true,
        product: true,
      },
    });

    if (item) {
      item.quantity += quantity;
    } else {
      const product = new ProductEntity();

      product.id = productId;

      item = this.cartItemRepository.create({
        cart,
        product,
        quantity,
      });
    }

    await this.cartItemRepository.save(item);

    const updatedCart = await this.cartRepository.findOneOrFail({
      where: {
        id: cart.id,
      },

      relations: {
        user: true,
        items: {
          product: true,
        },
      },
    });

    return CartMapper.toDomain(updatedCart);
  }

  //UPDATE CART ITEM
  async updateItem(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<CartDomain> {
    const cart = await this.cartRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },

      relations: {
        user: true,
        items: {
          product: true,
        },
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const item = await this.cartItemRepository.findOne({
      where: {
        cart: {
          id: cart.id,
        },

        product: {
          id: productId,
        },
      },

      relations: {
        cart: true,
        product: true,
      },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    item.quantity = quantity;

    await this.cartItemRepository.save(item);

    const updatedCart = await this.cartRepository.findOneOrFail({
      where: {
        id: cart.id,
      },

      relations: {
        user: true,
        items: {
          product: true,
        },
      },
    });

    return CartMapper.toDomain(updatedCart);
  }

  //REMOVE CART ITEM
  async removeItem(userId: string, productId: string): Promise<void> {
    const cart = await this.cartRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const result = await this.cartItemRepository.delete({
      cart: {
        id: cart.id,
      },

      product: {
        id: productId,
      },
    });

    if (result.affected === 0) {
      throw new NotFoundException('Cart item not found');
    }
  }

  //CLEAR CART
  async clearCart(userId: string): Promise<void> {
    const cart = await this.cartRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    await this.cartItemRepository.delete({
      cart: {
        id: cart.id,
      },
    });
  }
}
