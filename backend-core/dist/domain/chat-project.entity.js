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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base/base.entity");
const chat_flow_entity_1 = __importDefault(require("./chat-flow.entity"));
/**
 * A ChatProject.
 */
let ChatProject = class ChatProject extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'name', nullable: false }),
    __metadata("design:type", String)
], ChatProject.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: 'status' }),
    __metadata("design:type", String)
], ChatProject.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ name: 'user_id', nullable: false }),
    __metadata("design:type", String)
], ChatProject.prototype, "userId", void 0);
__decorate([
    typeorm_1.OneToOne(type => chat_flow_entity_1.default, other => other.chatProject),
    typeorm_1.JoinColumn(),
    __metadata("design:type", chat_flow_entity_1.default)
], ChatProject.prototype, "flow", void 0);
ChatProject = __decorate([
    typeorm_1.Entity('chat_project')
], ChatProject);
exports.default = ChatProject;
//# sourceMappingURL=chat-project.entity.js.map