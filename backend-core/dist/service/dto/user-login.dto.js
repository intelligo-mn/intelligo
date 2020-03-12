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
const class_validator_1 = require("class-validator");
class UserLoginDTO {
}
__decorate([
    swagger_1.ApiModelProperty({ description: 'User password', required: true }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserLoginDTO.prototype, "password", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'User remember login', required: false }),
    __metadata("design:type", Boolean)
], UserLoginDTO.prototype, "rememberMe", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'User login name', required: true }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserLoginDTO.prototype, "username", void 0);
exports.UserLoginDTO = UserLoginDTO;
//# sourceMappingURL=user-login.dto.js.map