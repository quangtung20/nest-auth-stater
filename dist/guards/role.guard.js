"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_authentication_guard_1 = require("./jwt-authentication.guard");
const RoleGuard = (role) => {
    class RoleGuardMixin extends jwt_authentication_guard_1.default {
        async canActivate(context) {
            await super.canActivate(context);
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            if ((user === null || user === void 0 ? void 0 : user.role) === role || (user === null || user === void 0 ? void 0 : user.role) === 'admin') {
                return true;
            }
            else {
                throw new common_1.ForbiddenException('You are not alowed to do that!');
            }
        }
    }
    return (0, common_1.mixin)(RoleGuardMixin);
};
exports.default = RoleGuard;
//# sourceMappingURL=role.guard.js.map