import Role from '../config/role.enum';
import { CanActivate, Type } from '@nestjs/common';
declare const RoleGuard: (role: Role | string) => Type<CanActivate>;
export default RoleGuard;
