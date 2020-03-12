"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../service/auth.service");
const user_module_1 = require("../module/user.module");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const passport_jwt_strategy_1 = require("../security/passport.jwt.strategy");
const user_jwt_controller_1 = require("../web/rest/user.jwt.controller");
const config_1 = require("../config");
const typeorm_1 = require("@nestjs/typeorm");
const authority_repository_1 = require("../repository/authority.repository");
const auth_controller_1 = require("../web/rest/auth.controller");
const account_controller_1 = require("../web/rest/account.controller");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([authority_repository_1.AuthorityRepository]),
            user_module_1.UserModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: config_1.config['jhipster.security.authentication.jwt.base64-secret'],
                signOptions: { expiresIn: '300s' }
            })
        ],
        controllers: [user_jwt_controller_1.UserJWTController, auth_controller_1.AuthController, account_controller_1.AccountController],
        providers: [auth_service_1.AuthService, passport_jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map