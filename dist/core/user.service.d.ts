import { Model } from 'mongoose';
import { LoginDTO, RegisterDTO } from '../auth/auth.dto';
import { Payload } from '../types/payload';
import { User } from '../types/user';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    create(userDTO: RegisterDTO): Promise<any>;
    find(): Promise<User[]>;
    findByLogin(userDTO: LoginDTO): Promise<any>;
    findByPayload(payload: Payload): Promise<User>;
    sanitizeUser(user: User): any;
}
