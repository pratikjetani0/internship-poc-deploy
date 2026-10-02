import { OrderDomain } from '../domain/order.domain';
import { OrderResponseDto } from '../dto/order-response.dto';
import { OrderEntity } from '../infrastructure/entities/order.entity';

export class OrderMapper {
  static toDomain(entity: OrderEntity): OrderDomain {
    return new OrderDomain({
      id: entity.id,
      userId: entity.user.id,
      totalAmount: Number(entity.totalAmount),
      status: entity.status,

      items:
        entity.items?.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: Number(item.price),
        })) ?? [],

      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  static toResponse(domain: OrderDomain): OrderResponseDto {
    return {
      id: domain.id ?? '',
      userId: domain.userId,
      totalAmount: domain.totalAmount,
      status: domain.status,
      items: domain.items,
      createdAt: domain.createdAt ?? new Date(),
      updatedAt: domain.updatedAt ?? new Date(),
    };
  }
}
