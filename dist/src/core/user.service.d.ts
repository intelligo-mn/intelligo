import { Model } from 'mongoose';
import { LoginDTO, RegisterDTO } from '../auth/auth.dto';
import { Payload } from '../types/payload';
import { User } from '../types/user';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    create(userDTO: RegisterDTO): Promise<any>;
    find(): Promise<any>;
    findByLogin(userDTO: LoginDTO): Promise<any>;
    findByPayload(payload: Payload): Promise<any>;
    sanitizeUser(user: User): any;
}
