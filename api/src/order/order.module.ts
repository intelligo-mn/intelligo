import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderSchema } from '../models/order.schema';
import { CoreModule } from '../core/core.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    CoreModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule { }
