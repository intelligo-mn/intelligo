import { User as UserDocument } from '../types/user';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './order.dto';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    listOrders({ id }: UserDocument): Promise<any>;
    createOrder(order: CreateOrderDTO, { id }: UserDocument): Promise<any>;
}
