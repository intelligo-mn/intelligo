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
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const authority_repository_1 = require("../repository/authority.repository");
const user_service_1 = require("../service/user.service");
let AuthService = class AuthService {
    constructor(jwtService, authorityRepository, userService) {
        this.jwtService = jwtService;
        this.authorityRepository = authorityRepository;
        this.userService = userService;
        this.logger = new common_1.Logger('AuthService');
    }
    async login(userLogin) {
        const loginUserName = userLogin.username;
        const loginPassword = userLogin.password;
        const userFind = await this.userService.findByfields({ where: { username: loginUserName, password: loginPassword } });
        if (!userFind) {
            throw new common_1.HttpException('Invalid login name or password.', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.findUserWithAuthById(userFind.id);
        const payload = { id: user.id, username: user.login, authorities: user.authorities };
        /* eslint-disable */
        return {
            id_token: this.jwtService.sign(payload)
        };
    }
    /* eslint-enable */
    async validateUser(payload) {
        return await this.findUserWithAuthById(payload.id);
    }
    async find() {
        return await this.authorityRepository.find();
    }
    async findUserWithAuthById(userId) {
        const user = await this.userService.findByfields({ where: { id: userId } });
        return user;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_1.InjectRepository(authority_repository_1.AuthorityRepository)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        authority_repository_1.AuthorityRepository,
        user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map