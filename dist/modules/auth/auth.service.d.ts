import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserDocument } from 'src/database/schemas/user.schema';
import { Model } from "mongoose";
export declare class AuthService {
    private jwtService;
    private configService;
    private userModel;
    constructor(jwtService: JwtService, configService: ConfigService, userModel: Model<UserDocument>);
    private hashSecret;
    private atSecret;
    private rtSecret;
    private genToken;
    register(body: any, res: Response): Promise<{
        msg: string;
        access_token: string;
        user: {};
    }>;
    login(email: string, password: string, res: Response): Promise<{
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
