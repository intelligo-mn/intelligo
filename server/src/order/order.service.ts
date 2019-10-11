import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order } from '../types/order';
import { CreateOrderDTO } from './order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private orderModel: Model<Order>) {}

  async listOrdersByUser(userId: string) {
    const orders = await this.orderModel
      .find({ owner: userId })
      .populate('owner')
      .populate('products.product');

    if (!orders) {
      throw new HttpException('No Orders Found', HttpStatus.NO_CONTENT);
    }
    return orders;
  }

  async createOrder(orderDTO: CreateOrderDTO, userId: string) {
    const createOrder = {
      owner: userId,
      products: orderDTO.products,
    };
    const { _id } = await this.orderModel.create(createOrder);
    let order = await this.orderModel
      .findById(_id)
      .populate('products.product');

    const totalPrice = order.products.reduce((acc, product) => {
      const price = product.product.price * product.quantity;
      return acc + price;
    }, 0);
    await order.update({ totalPrice });

    order = await this.orderModel
      .findById(_id)
      .populate('owner')
      .populate('products.product');
    return order;
  }
}
