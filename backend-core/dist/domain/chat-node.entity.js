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
const section_entity_1 = __importDefault(require("./section.entity"));
const button_entity_1 = __importDefault(require("./button.entity"));
const chat_flow_entity_1 = __importDefault(require("./chat-flow.entity"));
const api_method_1 = require("./enumeration/api-method");
/**
 * A ChatNode.
 */
let ChatNode = class ChatNode extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'name', nullable: false }),
    __metadata("design:type", String)
], ChatNode.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: 'emotion' }),
    __metadata("design:type", String)
], ChatNode.prototype, "emotion", void 0);
__decorate([
    typeorm_1.Column({ name: 'chat_node_type' }),
    __metadata("design:type", String)
], ChatNode.prototype, "chatNodeType", void 0);
__decorate([
    typeorm_1.Column({ name: 'variable_name' }),
    __metadata("design:type", String)
], ChatNode.prototype, "variableName", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', name: 'api_method', enum: api_method_1.APIMethod }),
    __metadata("design:type", Number)
], ChatNode.prototype, "apiMethod", void 0);
__decorate([
    typeorm_1.Column({ name: 'api_url' }),
    __metadata("design:type", String)
], ChatNode.prototype, "apiUrl", void 0);
__decorate([
    typeorm_1.Column({ name: 'api_response_data_root' }),
    __metadata("design:type", String)
], ChatNode.prototype, "apiResponseDataRoot", void 0);
__decorate([
    typeorm_1.Column({ name: 'next_node_id' }),
    __metadata("design:type", String)
], ChatNode.prototype, "nextNodeId", void 0);
__decorate([
    typeorm_1.Column({ name: 'required_variables' }),
    __metadata("design:type", String)
], ChatNode.prototype, "requiredVariables", void 0);
__decorate([
    typeorm_1.Column({ name: 'group_name' }),
    __metadata("design:type", String)
], ChatNode.prototype, "groupName", void 0);
__decorate([
    typeorm_1.Column({ name: 'card_header' }),
    __metadata("design:type", String)
], ChatNode.prototype, "cardHeader", void 0);
__decorate([
    typeorm_1.Column({ name: 'card_footer' }),
    __metadata("design:type", String)
], ChatNode.prototype, "cardFooter", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', name: 'is_start_node' }),
    __metadata("design:type", Boolean)
], ChatNode.prototype, "isStartNode", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', name: 'is_goal_node' }),
    __metadata("design:type", Boolean)
], ChatNode.prototype, "isGoalNode", void 0);
__decorate([
    typeorm_1.Column({ name: 'target_bot_id' }),
    __metadata("design:type", String)
], ChatNode.prototype, "targetBotId", void 0);
__decorate([
    typeorm_1.Column({ name: 'target_node_id' }),
    __metadata("design:type", String)
], ChatNode.prototype, "targetNodeId", void 0);
__decorate([
    typeorm_1.OneToMany(type => section_entity_1.default, other => other.chatNode),
    __metadata("design:type", Array)
], ChatNode.prototype, "sections", void 0);
__decorate([
    typeorm_1.OneToMany(type => button_entity_1.default, other => other.chatNode),
    __metadata("design:type", Array)
], ChatNode.prototype, "buttons", void 0);
__decorate([
    typeorm_1.ManyToOne(type => chat_flow_entity_1.default, other => other.chatNodes),
    __metadata("design:type", chat_flow_entity_1.default)
], ChatNode.prototype, "chatFlow", void 0);
ChatNode = __decorate([
    typeorm_1.Entity('chat_node')
], ChatNode);
exports.default = ChatNode;
//# sourceMappingURL=chat-node.entity.js.map