import { PaymentDomain } from '../domain/payment.domain';
import { PaymentResponseDto } from '../dto/payment-response.dto';
import { PaymentEntity } from '../infrastructure/entities/payment.entity';

export class PaymentMapper {
  static toDomain(entity: PaymentEntity): PaymentDomain {
    return new PaymentDomain({
      id: entity.id,
      userId: entity.order.user.id,
      orderId: entity.order.id,
      amount: Number(entity.amount),
      status: entity.status,
      method: entity.method,
      transactionId: entity.transactionId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  static toResponse(domain: PaymentDomain): PaymentResponseDto {
    return {
      id: domain.id ?? '',
      orderId: domain.orderId,
      amount: domain.amount,
      status: domain.status,
      method: domain.method,
      transactionId: domain.transactionId,
      createdAt: domain.createdAt ?? new Date(),
      updatedAt: domain.updatedAt ?? new Date(),
    };
  }
}
