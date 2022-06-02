import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
declare const JwtAuthenticationGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export default class JwtAuthenticationGuard extends JwtAuthenticationGuard_base {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
}
export {};
