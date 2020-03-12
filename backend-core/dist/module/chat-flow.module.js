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
const chat_flow_controller_1 = require("../web/rest/chat-flow.controller");
const chat_flow_repository_1 = require("../repository/chat-flow.repository");
const chat_flow_service_1 = require("../service/chat-flow.service");
let ChatFlowModule = class ChatFlowModule {
};
ChatFlowModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([chat_flow_repository_1.ChatFlowRepository])],
        controllers: [chat_flow_controller_1.ChatFlowController],
        providers: [chat_flow_service_1.ChatFlowService],
        exports: [chat_flow_service_1.ChatFlowService]
    })
], ChatFlowModule);
exports.ChatFlowModule = ChatFlowModule;
//# sourceMappingURL=chat-flow.module.js.map