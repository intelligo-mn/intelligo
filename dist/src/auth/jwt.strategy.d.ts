import { VerifiedCallback } from 'passport-jwt';
import { AuthService } from './auth.service';
declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: any, done: VerifiedCallback): Promise<any>;
}
export {};
