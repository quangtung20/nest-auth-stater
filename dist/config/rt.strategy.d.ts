import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwt-payload.interface';
import { JwtPayloadWithRt } from './jwt-payload-with-rt.interface';
declare const RtStrategy_base: new (...args: any[]) => Strategy;
export declare class RtStrategy extends RtStrategy_base {
    constructor(configService: ConfigService);
    validate(req: Request, payload: JwtPayload): JwtPayloadWithRt;
}
export {};
