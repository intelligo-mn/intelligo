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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let SocialCardComponent = class SocialCardComponent {
    constructor() {
        this.title = this.title || "";
        this.subtitle = this.subtitle || "";
        this.avatarImgPath = this.avatarImgPath || "";
        this.backgroundImg = this.backgroundImg || "";
        this.postCount = this.postCount || "0";
        this.followersCount = this.followersCount || "0";
        this.followingCount = this.followingCount || "0";
    }
};
__decorate([
    core_1.Input("title"),
    __metadata("design:type", String)
], SocialCardComponent.prototype, "title", void 0);
__decorate([
    core_1.Input("subtitle"),
    __metadata("design:type", String)
], SocialCardComponent.prototype, "subtitle", void 0);
__decorate([
    core_1.Input("avatarImgPath"),
    __metadata("design:type", String)
], SocialCardComponent.prototype, "avatarImgPath", void 0);
__decorate([
    core_1.Input("backgroundImg"),
    __metadata("design:type", String)
], SocialCardComponent.prototype, "backgroundImg", void 0);
__decorate([
    core_1.Input("postCount"),
    __metadata("design:type", String)
], SocialCardComponent.prototype, "postCount", void 0);
__decorate([
    core_1.Input("followersCount"),
    __metadata("design:type", String)
], SocialCardComponent.prototype, "followersCount", void 0);
__decorate([
    core_1.Input("followingCount"),
    __metadata("design:type", String)
], SocialCardComponent.prototype, "followingCount", void 0);
SocialCardComponent = __decorate([
    core_1.Component({
        selector: "social-card",
        templateUrl: "./social-card.component.html",
        styleUrls: ["./social-card.component.scss"]
    }),
    __metadata("design:paramtypes", [])
], SocialCardComponent);
exports.SocialCardComponent = SocialCardComponent;
//# sourceMappingURL=social-card.component.js.map