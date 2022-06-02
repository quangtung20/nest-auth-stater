import { JwtPayload } from './jwt-payload.interface';
export declare type JwtPayloadWithRt = JwtPayload & {
    refreshToken: string;
};
