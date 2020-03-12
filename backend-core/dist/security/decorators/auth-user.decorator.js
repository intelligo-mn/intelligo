"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.AuthUser = common_1.createParamDecorator((data, request) => request.user);
//# sourceMappingURL=auth-user.decorator.js.map