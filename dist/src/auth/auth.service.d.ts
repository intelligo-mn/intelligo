import { UserService } from '../core/user.service';
import { Payload } from '../types/payload';
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    signPayload(payload: Payload): Promise<any>;
    validateUser(payload: Payload): Promise<any>;
}
