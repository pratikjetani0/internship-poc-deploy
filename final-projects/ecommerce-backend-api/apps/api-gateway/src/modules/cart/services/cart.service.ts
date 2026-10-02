import { Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from '../infrastructure/repositories/cart.repository';
import { ProductRepository } from '../../products/infrastructure/repositories/product.repository';
import { UserRepository } from '../../user/infrastructure/repositories/user.repository';
import { AddCartItemDto } from '../dto/add-cart-item.dto';
import { UpdateCartItemDto } from '../dto/update-cart-item.dto';
import { CartMapper } from '../mappers/cart.mapper';
import { CartResponseDto } from '../dto/cart-response.dto';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productRepository: ProductRepository,
    private readonly userRepository: UserRepository,
  ) {}

  //GET CART
  async getCart(userId: string): Promise<
    | CartResponseDto
    | {
        items: [];
        totalAmount: number;
      }
  > {
    const cart = await this.cartRepository.findCartByUserId(userId);

    if (!cart) {
      return {
        items: [],
        totalAmount: 0,
      };
    }

    return CartMapper.toResponse(cart);
  }

  //ADD CART ITEM
  async addItem(userId: string, dto: AddCartItemDto) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = await this.productRepository.findById(dto.productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const cart = await this.cartRepository.addItem(
      userId,
      dto.productId,
      dto.quantity,
    );

    return CartMapper.toResponse(cart);
  }

  //UPDATED CART ITEM
  async updateItem(userId: string, productId: string, dto: UpdateCartItemDto) {
    const cart = await this.cartRepository.updateItem(
      userId,
      productId,
      dto.quantity,
    );

    return CartMapper.toResponse(cart);
  }

  //REMOVE CART ITEM
  async removeItem(userId: string, productId: string) {
    await this.cartRepository.removeItem(userId, productId);

    return {
      message: 'Item removed successfully',
    };
  }

  //CLEAR CART ITEM
  async clearCart(userId: string) {
    await this.cartRepository.clearCart(userId);

    return {
      message: 'Cart cleared successfully',
    };
  }
}
