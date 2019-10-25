import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class SellerGuard implements CanActivate {
    constructor();
    canActivate(context: ExecutionContext): boolean;
}
