"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const button_controller_1 = require("../web/rest/button.controller");
const button_repository_1 = require("../repository/button.repository");
const button_service_1 = require("../service/button.service");
let ButtonModule = class ButtonModule {
};
ButtonModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([button_repository_1.ButtonRepository])],
        controllers: [button_controller_1.ButtonController],
        providers: [button_service_1.ButtonService],
        exports: [button_service_1.ButtonService]
    })
], ButtonModule);
exports.ButtonModule = ButtonModule;
//# sourceMappingURL=button.module.js.map