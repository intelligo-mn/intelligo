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
const user_repository_1 = require("../repository/user.repository");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findById(id) {
        const result = await this.userRepository.findOne(id);
        return this.flatAuthorities(result);
    }
    async findByfields(options) {
        options.relations = ['authorities'];
        const result = await this.userRepository.findOne(options);
        return this.flatAuthorities(result);
    }
    async find(options) {
        const result = await this.userRepository.findOne(options);
        return this.flatAuthorities(result);
    }
    async findAndCount(options) {
        options.relations = ['authorities'];
        const resultList = await this.userRepository.findAndCount(options);
        const users = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(user => users.push(this.flatAuthorities(user)));
            resultList[0] = users;
        }
        return resultList;
    }
    async save(user) {
        user = this.convertInAuthorities(user);
        const result = await this.userRepository.save(user);
        return this.flatAuthorities(result);
    }
    async update(user) {
        return await this.save(user);
    }
    async delete(user) {
        return await this.userRepository.remove(user);
    }
    flatAuthorities(user) {
        if (user && user.authorities) {
            const authorities = [];
            user.authorities.forEach(authority => authorities.push(authority.name));
            user.authorities = authorities;
        }
        return user;
    }
    convertInAuthorities(user) {
        if (user && user.authorities) {
            const authorities = [];
            user.authorities.forEach(authority => authorities.push({ name: authority }));
            user.authorities = authorities;
        }
        return user;
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map