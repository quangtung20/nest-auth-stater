import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { User, UserDocument } from 'src/database/schemas/user.schema';
import { Model } from "mongoose";
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
    constructor(
        private jwtService:JwtService,
        private configService:ConfigService,
        @InjectModel(User.name) private userModel:Model<UserDocument>
    ){}

    private hashSecret:number = this.configService.get<number>('HASH_PASS');
    private atSecret:string = this.configService.get<string>('AT_SECRET');
    private rtSecret:string = this.configService.get<string>('RT_SECRET');

    private async genToken(payload:object,res:Response){
        
        const accessToken:string = await this.jwtService.sign(
            payload,
            {
                secret: this.atSecret,
                expiresIn:'1d'
            }
        );

        const refreshToken:string = await this.jwtService.sign(
            payload,
            {
                secret:this.rtSecret,
                expiresIn:'30d'
            }
        );

        res.cookie('refreshtoken',refreshToken,{
            httpOnly:true,
            path:'/api/refresh_token',
            maxAge:30*24*60*60*1000
        })

        return accessToken;
    }

    async register(body,res:Response){
        const newFullname:string = body.fullname.toLowerCase();

        const checkUsername = await this.userModel.findOne({username:body.username});
        if(checkUsername){
            throw new BadRequestException({msg: "This user name already exists."});
        }

        const checkEmail = await this.userModel.findOne({email:body.email});
        if(checkEmail){
            throw new BadRequestException({msg: "This email already exists."})
        }

        const password = await bcrypt.hash(body.password,this.hashSecret);

        const accessToken = await this.genToken({_id:body.id},res);

        const newUser:UserDocument = await this.userModel.create({...body,password,fullname:newFullname});

        return {
            msg:'Register Success!',
            access_token:accessToken,
            user:{
                ...newUser._doc,
            }
        }
    }
    
    async login(email:string,password:string,res:Response){
        const checkUser:UserDocument = await this.userModel.findOne({email});
        if(!checkUser){
            throw new NotFoundException({msg: "This email does not exist."});
        }
        const checkPass = await bcrypt.compare(password,checkUser.password);
        if(!checkPass){
            throw new BadRequestException({msg:'Invalid credential'});
        }

        const accessToken = await this.genToken({id:checkUser._id},res);

        return {
            msg: 'Login Success!',
            access_token:accessToken,
            user: {
                ...checkUser._doc,
                password: ''
            }
        }
    }

    async logout(res:Response){
        res.clearCookie('refreshtoken',{
           path:'/api/refresh_token',
        });

        return {msg:'logout success'};
    }
}
