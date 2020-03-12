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
const chat_project_controller_1 = require("../web/rest/chat-project.controller");
const chat_project_repository_1 = require("../repository/chat-project.repository");
const chat_project_service_1 = require("../service/chat-project.service");
let ChatProjectModule = class ChatProjectModule {
};
ChatProjectModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([chat_project_repository_1.ChatProjectRepository])],
        controllers: [chat_project_controller_1.ChatProjectController],
        providers: [chat_project_service_1.ChatProjectService],
        exports: [chat_project_service_1.ChatProjectService]
    })
], ChatProjectModule);
exports.ChatProjectModule = ChatProjectModule;
//# sourceMappingURL=chat-project.module.js.map