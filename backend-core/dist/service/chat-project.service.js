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
const chat_project_repository_1 = require("../repository/chat-project.repository");
let ChatProjectService = class ChatProjectService {
    constructor(chatProjectRepository) {
        this.chatProjectRepository = chatProjectRepository;
        this.logger = new common_1.Logger('ChatProjectService');
    }
    async findById(id) {
        return await this.chatProjectRepository.findOne(id);
    }
    async findByfields(options) {
        return await this.chatProjectRepository.findOne(options);
    }
    async findAndCount(options) {
        return await this.chatProjectRepository.findAndCount(options);
    }
    async save(chatProject) {
        return await this.chatProjectRepository.save(chatProject);
    }
    async update(chatProject) {
        return await this.save(chatProject);
    }
    async delete(chatProject) {
        return await this.chatProjectRepository.remove(chatProject);
    }
};
ChatProjectService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(chat_project_repository_1.ChatProjectRepository)),
    __metadata("design:paramtypes", [chat_project_repository_1.ChatProjectRepository])
], ChatProjectService);
exports.ChatProjectService = ChatProjectService;
//# sourceMappingURL=chat-project.service.js.map