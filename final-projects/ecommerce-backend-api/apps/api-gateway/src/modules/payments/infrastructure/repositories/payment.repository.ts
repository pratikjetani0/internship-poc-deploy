import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from '../entities/payment.entity';
import { Repository } from 'typeorm';
import { PaymentMapper } from '../../mappers/payment.mapper';
import { PaymentDomain } from '../../domain/payment.domain';
import { OrderEntity } from '../../../orders/infrastructure/entities/order.entity';
import { PaymentMethod, PaymentStatus } from '@app/common';

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  //FIND PAYMENT BY ID
  async findById(paymentId: string): Promise<PaymentDomain | null> {
    const payment = await this.paymentRepository.findOne({
      where: {
        id: paymentId,
      },
      relations: {
        order: {
          user: true,
        },
      },
    });

    return payment ? PaymentMapper.toDomain(payment) : null;
  }

  //FIND BY ORDER ID
  async findByOrderId(orderId: string): Promise<PaymentDomain | null> {
    const payment = await this.paymentRepository.findOne({
      where: {
        order: {
          id: orderId,
        },
      },
      relations: {
        order: {
          user: true,
        },
      },
    });

    return payment ? PaymentMapper.toDomain(payment) : null;
  }

  //FIND BY USER ID
  async findByUserId(userId: string): Promise<PaymentDomain[]> {
    const payments = await this.paymentRepository.find({
      where: {
        order: {
          user: {
            id: userId,
          },
        },
      },
      relations: {
        order: {
          user: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return payments.map((payment) => PaymentMapper.toDomain(payment));
  }

  //PROCESS PAYMENT
  async processPayment(
    orderId: string,
    amount: number,
    method: PaymentMethod = PaymentMethod.COD,
  ): Promise<PaymentDomain> {
    const order = new OrderEntity();
    order.id = orderId;

    const payment = this.paymentRepository.create({
      order,
      amount,
      status: PaymentStatus.SUCCESS,
      method,
      transactionId: `TXN-${Date.now()}`,
    });

    const saved = await this.paymentRepository.save(payment);

    const fullPayment = await this.paymentRepository.findOneOrFail({
      where: {
        id: saved.id,
      },
      relations: {
        order: {
          user: true,
        },
      },
    });

    return PaymentMapper.toDomain(fullPayment);
  }

  //UPDATE STATUS
  async updateStatus(
    paymentId: string,
    status: PaymentStatus,
  ): Promise<PaymentDomain> {
    const payment = await this.paymentRepository.findOne({
      where: {
        id: paymentId,
      },
      relations: {
        order: {
          user: true,
        },
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    payment.status = status;

    await this.paymentRepository.save(payment);

    return PaymentMapper.toDomain(payment);
  }

  // GET ALL PAYMENTS
  async findAll(): Promise<PaymentDomain[]> {
    const payments = await this.paymentRepository.find({
      relations: {
        order: {
          user: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return payments.map((payment) => PaymentMapper.toDomain(payment));
  }
}
