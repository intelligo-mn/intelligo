import { Model } from 'mongoose';
import { Order } from '../types/order';
import { CreateOrderDTO } from './order.dto';
export declare class OrderService {
    private orderModel;
    constructor(orderModel: Model<Order>);
    listOrdersByUser(userId: string): Promise<Order[]>;
    createOrder(orderDTO: CreateOrderDTO, userId: string): Promise<Order>;
}
