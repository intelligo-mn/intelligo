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
Object.defineProperty(exports, "__esModule", { value: true });
const authority_entity_1 = require("./authority.entity");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base/base.entity");
const swagger_1 = require("@nestjs/swagger");
let User = class User extends base_entity_1.BaseEntity {
};
__decorate([
    swagger_1.ApiModelProperty({ uniqueItems: true, example: 'myuser', description: 'User login' }),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "login", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'MyUser', description: 'User first name' }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'MyUser', description: 'User last name' }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'myuser@localhost', description: 'User email' }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'true', description: 'User activation' }),
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], User.prototype, "activated", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'en', description: 'User language' }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "langKey", void 0);
__decorate([
    typeorm_1.ManyToMany(type => authority_entity_1.Authority),
    typeorm_1.JoinTable(),
    swagger_1.ApiModelProperty({ isArray: true, enum: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_ANONYMOUS'], description: 'Array of permissions' }),
    __metadata("design:type", Array)
], User.prototype, "authorities", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'myuser', description: 'User password' }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "imageUrl", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "activationKey", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "resetKey", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "resetDate", void 0);
User = __decorate([
    typeorm_1.Entity('jhi_user')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map