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
const security_1 = require("../../security");
const user_entity_1 = require("../../domain/user.entity");
const logging_interceptor_1 = require("../../client/interceptors/logging.interceptor");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("../../service/auth.service");
let AccountController = class AccountController {
    constructor(authService) {
        this.authService = authService;
        this.logger = new common_1.Logger('AccountController');
    }
    registerAccount(req, user, res) {
        return res.sendStatus(201);
    }
    activateAccount(key, res) {
        return res.sendStatus(200);
    }
    isAuthenticated(req) {
        const user = req.user;
        return user.login;
    }
    async getAccount(req) {
        const user = req.user;
        return await this.authService.findUserWithAuthById(user.id);
    }
    saveAccount(req, user, res) {
        return res.sendStatus(201);
    }
    changePassword(req, user, res) {
        return res.sendStatus(201);
    }
    requestPasswordReset(req, email, res) {
        return res.sendStatus(201);
    }
    finishPasswordReset(req, keyAndPassword, res) {
        return res.sendStatus(201);
    }
};
__decorate([
    common_1.Post('/register'),
    swagger_1.ApiOperation({ title: 'Register user' }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Registered user',
        type: user_entity_1.User
    }),
    __param(0, common_1.Req()), __param(1, common_1.Body()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User, Object]),
    __metadata("design:returntype", Object)
], AccountController.prototype, "registerAccount", null);
__decorate([
    common_1.Get('/activate'),
    swagger_1.ApiOperation({ title: 'Activate an account' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'activated'
    }),
    __param(0, common_1.Param()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Object)
], AccountController.prototype, "activateAccount", null);
__decorate([
    common_1.Get('/authenticate'),
    swagger_1.ApiOperation({ title: 'Check if the user is authenticated' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'login authenticated'
    }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AccountController.prototype, "isAuthenticated", null);
__decorate([
    common_1.Get('/account'),
    swagger_1.ApiOperation({ title: 'Get the current user.' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'user retrieved'
    }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAccount", null);
__decorate([
    common_1.Post('/account'),
    swagger_1.ApiOperation({ title: 'Update the current user information' }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'user info updated',
        type: user_entity_1.User
    }),
    __param(0, common_1.Req()), __param(1, common_1.Body()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User, Object]),
    __metadata("design:returntype", Object)
], AccountController.prototype, "saveAccount", null);
__decorate([
    common_1.Post('/account/change-password'),
    swagger_1.ApiOperation({ title: 'Change current password' }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'user password changed',
        type: user_entity_1.User
    }),
    __param(0, common_1.Req()), __param(1, common_1.Body()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User, Object]),
    __metadata("design:returntype", Object)
], AccountController.prototype, "changePassword", null);
__decorate([
    common_1.Post('/account/reset-password/init'),
    swagger_1.ApiOperation({ title: 'Send an email to reset the password of the user' }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'mail to reset password sent',
        type: 'string'
    }),
    __param(0, common_1.Req()), __param(1, common_1.Body()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Object)
], AccountController.prototype, "requestPasswordReset", null);
__decorate([
    common_1.Post('/account/reset-password/finish'),
    swagger_1.ApiOperation({ title: 'Finish to reset the password of the user' }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'password reset',
        type: 'string'
    }),
    __param(0, common_1.Req()), __param(1, common_1.Body()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Object)
], AccountController.prototype, "finishPasswordReset", null);
AccountController = __decorate([
    common_1.Controller('api'),
    common_1.UseInterceptors(logging_interceptor_1.LoggingInterceptor),
    common_1.UseGuards(security_1.AuthGuard, security_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('account-resource'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AccountController);
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map