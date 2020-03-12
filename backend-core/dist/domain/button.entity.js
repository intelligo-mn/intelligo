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
 * A Button.
 */
let Button = class Button extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'button_name' }),
    __metadata("design:type", String)
], Button.prototype, "buttonName", void 0);
__decorate([
    typeorm_1.Column({ name: 'button_text' }),
    __metadata("design:type", String)
], Button.prototype, "buttonText", void 0);
__decorate([
    typeorm_1.Column({ type: 'integer', name: 'emotion' }),
    __metadata("design:type", Number)
], Button.prototype, "emotion", void 0);
__decorate([
    typeorm_1.Column({ name: 'button_type' }),
    __metadata("design:type", String)
], Button.prototype, "buttonType", void 0);
__decorate([
    typeorm_1.Column({ name: 'deep_link_url' }),
    __metadata("design:type", String)
], Button.prototype, "deepLinkUrl", void 0);
__decorate([
    typeorm_1.Column({ name: 'url' }),
    __metadata("design:type", String)
], Button.prototype, "url", void 0);
__decorate([
    typeorm_1.Column({ name: 'items_source' }),
    __metadata("design:type", String)
], Button.prototype, "itemsSource", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', name: 'allow_multiple' }),
    __metadata("design:type", Boolean)
], Button.prototype, "allowMultiple", void 0);
__decorate([
    typeorm_1.Column({ type: 'integer', name: 'bounce_timeout' }),
    __metadata("design:type", Number)
], Button.prototype, "bounceTimeout", void 0);
__decorate([
    typeorm_1.Column({ name: 'next_node_id' }),
    __metadata("design:type", String)
], Button.prototype, "nextNodeId", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', name: 'default_button' }),
    __metadata("design:type", Boolean)
], Button.prototype, "defaultButton", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', name: 'hidden' }),
    __metadata("design:type", Boolean)
], Button.prototype, "hidden", void 0);
__decorate([
    typeorm_1.Column({ name: 'variable_value' }),
    __metadata("design:type", String)
], Button.prototype, "variableValue", void 0);
__decorate([
    typeorm_1.Column({ name: 'prefix_text' }),
    __metadata("design:type", String)
], Button.prototype, "prefixText", void 0);
__decorate([
    typeorm_1.Column({ name: 'postfix_text' }),
    __metadata("design:type", String)
], Button.prototype, "postfixText", void 0);
__decorate([
    typeorm_1.Column({ name: 'placeholder_text' }),
    __metadata("design:type", String)
], Button.prototype, "placeholderText", void 0);
__decorate([
    typeorm_1.Column({ name: 'condition_match_key' }),
    __metadata("design:type", String)
], Button.prototype, "conditionMatchKey", void 0);
__decorate([
    typeorm_1.Column({ name: 'condition_operator' }),
    __metadata("design:type", String)
], Button.prototype, "conditionOperator", void 0);
__decorate([
    typeorm_1.Column({ name: 'condition_match_value' }),
    __metadata("design:type", String)
], Button.prototype, "conditionMatchValue", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', name: 'post_to_chat' }),
    __metadata("design:type", Boolean)
], Button.prototype, "postToChat", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', name: 'does_repeat' }),
    __metadata("design:type", Boolean)
], Button.prototype, "doesRepeat", void 0);
__decorate([
    typeorm_1.Column({ name: 'repeat_on' }),
    __metadata("design:type", String)
], Button.prototype, "repeatOn", void 0);
__decorate([
    typeorm_1.Column({ name: 'repeat_as' }),
    __metadata("design:type", String)
], Button.prototype, "repeatAs", void 0);
__decorate([
    typeorm_1.Column({ type: 'integer', name: 'start_position' }),
    __metadata("design:type", Number)
], Button.prototype, "startPosition", void 0);
__decorate([
    typeorm_1.Column({ type: 'integer', name: 'max_repeats' }),
    __metadata("design:type", Number)
], Button.prototype, "maxRepeats", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', name: 'advanced_options' }),
    __metadata("design:type", Boolean)
], Button.prototype, "advancedOptions", void 0);
__decorate([
    typeorm_1.Column({ type: 'integer', name: 'min_length' }),
    __metadata("design:type", Number)
], Button.prototype, "minLength", void 0);
__decorate([
    typeorm_1.Column({ type: 'integer', name: 'max_length' }),
    __metadata("design:type", Number)
], Button.prototype, "maxLength", void 0);
__decorate([
    typeorm_1.Column({ name: 'default_text' }),
    __metadata("design:type", String)
], Button.prototype, "defaultText", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', name: 'is_multi_line' }),
    __metadata("design:type", Boolean)
], Button.prototype, "isMultiLine", void 0);
__decorate([
    typeorm_1.Column({ name: 'content_id' }),
    __metadata("design:type", String)
], Button.prototype, "contentId", void 0);
__decorate([
    typeorm_1.Column({ name: 'content_emotion' }),
    __metadata("design:type", String)
], Button.prototype, "contentEmotion", void 0);
__decorate([
    typeorm_1.ManyToOne(type => chat_node_entity_1.default, other => other.buttons),
    __metadata("design:type", chat_node_entity_1.default)
], Button.prototype, "chatNode", void 0);
Button = __decorate([
    typeorm_1.Entity('button')
], Button);
exports.default = Button;
//# sourceMappingURL=button.entity.js.map