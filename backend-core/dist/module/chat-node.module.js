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
const chat_node_controller_1 = require("../web/rest/chat-node.controller");
const chat_node_repository_1 = require("../repository/chat-node.repository");
const chat_node_service_1 = require("../service/chat-node.service");
let ChatNodeModule = class ChatNodeModule {
};
ChatNodeModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([chat_node_repository_1.ChatNodeRepository])],
        controllers: [chat_node_controller_1.ChatNodeController],
        providers: [chat_node_service_1.ChatNodeService],
        exports: [chat_node_service_1.ChatNodeService]
    })
], ChatNodeModule);
exports.ChatNodeModule = ChatNodeModule;
//# sourceMappingURL=chat-node.module.js.map