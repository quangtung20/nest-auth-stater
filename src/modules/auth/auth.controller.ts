import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';


@Controller('')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    register(
        @Res({passthrough:true}) res:Response,
        @Body() body
    ){
        return this.authService.register(body,res);
    }

    @Post('login')
    login(
        @Res({passthrough:true}) res:Response,
        @Body('email') email:string,
        @Body('password') password:string 
    ){
        return this.authService.login(email,password,res);
    }
   
    @Post('logout')
    logout(
        @Res({passthrough:true}) res:Response,
    ){
        return this.authService.logout(res);
    }
    

}
