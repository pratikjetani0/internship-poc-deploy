import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PaymentService } from '../services/payment.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { ProcessPaymentDto } from '../dto/process-payment.dto';
import type { JwtPayload } from '../../auth/types/jwt-payload.type';

@ApiTags('Payments')
@ApiBearerAuth('JWT-auth')
@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout')
  @ApiOperation({ summary: 'Checkout: create order and process payment' })
  checkout(@CurrentUser('sub') userId: string, @Body() dto: ProcessPaymentDto) {
    return this.paymentService.checkout(userId, dto.method);
  }

  @Post('orders/:orderId')
  @ApiOperation({ summary: 'Process payment for order' })
  processPayment(
    @Param('orderId') orderId: string,
    @Body() dto: ProcessPaymentDto,
  ) {
    return this.paymentService.processPayment(orderId, dto.method);
  }

  @Get()
  @ApiOperation({ summary: 'Get my payments' })
  getPayments(@CurrentUser() user: JwtPayload) {
    return this.paymentService.getPayments(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment details' })
  getPaymentById(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.paymentService.getPaymentById(user, id);
  }
}
