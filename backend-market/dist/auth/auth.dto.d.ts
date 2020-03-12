import { Address } from '../types/user';
export declare class LoginDTO {
    username: string;
    password: string;
}
export declare class RegisterDTO {
    username: string;
    password: string;
    seller?: boolean;
    address?: Address;
}
