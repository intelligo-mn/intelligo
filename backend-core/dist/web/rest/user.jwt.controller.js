"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_login_dto_1 = require("../../service/dto/user-login.dto");
const auth_service_1 = require("../../service/auth.service");
const logging_interceptor_1 = require("../../client/interceptors/logging.interceptor");
const swagger_1 = require("@nestjs/swagger");
let UserJWTController = class UserJWTController {
    constructor(authService) {
        this.authService = authService;
        this.logger = new common_1.Logger('UserJWTController');
    }
    async authorize(req, user, res) {
        const jwt = await this.authService.login(user);
        res.setHeader('Authorization', 'Bearer ' + jwt.id_token);
        return res.json(jwt);
    }
};
__decorate([
    common_1.Post('/authenticate'),
    swagger_1.ApiOperation({ title: 'Authorization api retrieving token' }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Authorized'
    }),
    __param(0, common_1.Req()), __param(1, common_1.Body()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_login_dto_1.UserLoginDTO, Object]),
    __metadata("design:returntype", Promise)
], UserJWTController.prototype, "authorize", null);
UserJWTController = __decorate([
    common_1.Controller('api'),
    common_1.UseInterceptors(logging_interceptor_1.LoggingInterceptor),
    swagger_1.ApiUseTags('user-jwt-controller'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], UserJWTController);
exports.UserJWTController = UserJWTController;
//# sourceMappingURL=user.jwt.controller.js.map