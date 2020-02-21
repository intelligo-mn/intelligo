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
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = require("bcryptjs");
const mongoose_2 = require("mongoose");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(userDTO) {
        const { username } = userDTO;
        const user = await this.userModel.findOne({ username });
        if (user) {
            throw new common_1.HttpException('User already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const createdUser = new this.userModel(userDTO);
        await createdUser.save();
        return this.sanitizeUser(createdUser);
    }
    async find() {
        return await this.userModel.find();
    }
    async findByLogin(userDTO) {
        const { username, password } = userDTO;
        const user = await this.userModel
            .findOne({ username })
            .select('username password seller created address');
        if (!user) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (await bcrypt.compare(password, user.password)) {
            return this.sanitizeUser(user);
        }
        else {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async findByPayload(payload) {
        const { username } = payload;
        return await this.userModel.findOne({ username });
    }
    sanitizeUser(user) {
        const sanitized = user.toObject();
        delete sanitized['password'];
        return sanitized;
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map