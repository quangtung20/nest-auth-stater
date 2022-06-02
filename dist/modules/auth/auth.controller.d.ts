import { Response } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(res: Response, body: any): Promise<{
        msg: string;
        access_token: string;
        user: {};
    }>;
    login(res: Response, email: string, password: string): Promise<{
        msg: string;
        access_token: string;
        user: {
            password: string;
        };
    }>;
    logout(res: Response): Promise<{
        msg: string;
    }>;
}
