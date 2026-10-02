import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '@app/common';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';
import type { JwtPayload } from '../../auth/types/jwt-payload.type';

@ApiTags('Orders')
@ApiBearerAuth('JWT-auth')
@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  //PUBLIC

  @Post()
  @ApiOperation({ summary: 'Create order from cart' })
  createOrder(@CurrentUser('sub') userId: string) {
    return this.orderService.createOrder(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get orders' })
  getMyOrders(@CurrentUser() user: JwtPayload) {
    return this.orderService.getOrders(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order details' })
  getOrderById(@CurrentUser() user: JwtPayload, @Param('id') orderId: string) {
    return this.orderService.getOrderById(user, orderId);
  }

  //ADMIN

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.orderService.updateOrderStatus(id, dto);
  }
}
