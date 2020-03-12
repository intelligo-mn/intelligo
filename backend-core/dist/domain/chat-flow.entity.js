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
const chat_node_entity_1 = __importDefault(require("./chat-node.entity"));
const chat_project_entity_1 = __importDefault(require("./chat-project.entity"));
/**
 * A ChatFlow.
 */
let ChatFlow = class ChatFlow extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'created_on' }),
    __metadata("design:type", String)
], ChatFlow.prototype, "createdOn", void 0);
__decorate([
    typeorm_1.Column({ name: 'updated_on' }),
    __metadata("design:type", String)
], ChatFlow.prototype, "updatedOn", void 0);
__decorate([
    typeorm_1.Column({ name: 'node_locations' }),
    __metadata("design:type", String)
], ChatFlow.prototype, "nodeLocations", void 0);
__decorate([
    typeorm_1.OneToMany(type => chat_node_entity_1.default, other => other.chatFlow),
    __metadata("design:type", Array)
], ChatFlow.prototype, "chatNodes", void 0);
__decorate([
    typeorm_1.OneToOne(type => chat_project_entity_1.default, other => other.flow),
    __metadata("design:type", chat_project_entity_1.default)
], ChatFlow.prototype, "chatProject", void 0);
ChatFlow = __decorate([
    typeorm_1.Entity('chat_flow')
], ChatFlow);
exports.default = ChatFlow;
//# sourceMappingURL=chat-flow.entity.js.map