import { UserService } from '../core/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    login(userDTO: LoginDTO): Promise<{
        user: any;
        token: string;
    }>;
    register(userDTO: RegisterDTO): Promise<{
        user: any;
        token: string;
    }>;
}
