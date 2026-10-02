import { CartDomain } from '../domain/cart.domain';
import { CartResponseDto } from '../dto/cart-response.dto';
import { CartEntity } from '../infrastructure/entities/cart.entity';

export class CartMapper {
  static toDomain(entity: CartEntity): CartDomain {
    return new CartDomain({
      id: entity.id,
      userId: entity.user.id,
      items:
        [...(entity.items ?? [])]
          .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
          .map((item) => ({
            productId: item.product.id,
            productName: item.product.name,
            price: Number(item.product.price),
            quantity: item.quantity,
            image: item.product.images?.[0] ?? '',
            stock: item.product.stock ?? 0,
            slug: item.product.slug ?? '',
            category: item.product.category ?? '',
          })) ?? [],
    });
  }

  static toResponse(domain: CartDomain): CartResponseDto {
    return {
      id: domain.id ?? '',
      userId: domain.userId,
      items: domain.items,
      totalAmount: domain.getTotalAmount(),
    };
  }
}
