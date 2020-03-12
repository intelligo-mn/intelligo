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
/**
 * A Section.
 */
let Section = class Section extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'section_type' }),
    __metadata("design:type", String)
], Section.prototype, "sectionType", void 0);
__decorate([
    typeorm_1.Column({ type: 'integer', name: 'delay_in_ms' }),
    __metadata("design:type", Number)
], Section.prototype, "delayInMs", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', name: 'hidden' }),
    __metadata("design:type", Boolean)
], Section.prototype, "hidden", void 0);
__decorate([
    typeorm_1.Column({ name: 'content_id' }),
    __metadata("design:type", String)
], Section.prototype, "contentId", void 0);
__decorate([
    typeorm_1.Column({ name: 'content_emotion' }),
    __metadata("design:type", String)
], Section.prototype, "contentEmotion", void 0);
__decorate([
    typeorm_1.ManyToOne(type => chat_node_entity_1.default, other => other.sections),
    __metadata("design:type", chat_node_entity_1.default)
], Section.prototype, "chatNode", void 0);
Section = __decorate([
    typeorm_1.Entity('section')
], Section);
exports.default = Section;
//# sourceMappingURL=section.entity.js.map