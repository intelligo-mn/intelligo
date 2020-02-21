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
const swagger_1 = require("@nestjs/swagger");
class LoginDTO {
}
__decorate([
    swagger_1.ApiProperty({ example: 'admin', description: 'The username of acount' }),
    __metadata("design:type", String)
], LoginDTO.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'password',
        description: 'The password of acount',
    }),
    __metadata("design:type", String)
], LoginDTO.prototype, "password", void 0);
exports.LoginDTO = LoginDTO;
class RegisterDTO {
}
__decorate([
    swagger_1.ApiProperty({ example: 'admin', description: 'The username of acount' }),
    __metadata("design:type", String)
], RegisterDTO.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'admin', description: 'The username of acount' }),
    __metadata("design:type", String)
], RegisterDTO.prototype, "password", void 0);
exports.RegisterDTO = RegisterDTO;
//# sourceMappingURL=auth.dto.js.map