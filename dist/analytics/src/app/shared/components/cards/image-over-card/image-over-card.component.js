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
let ImageOverCardComponent = class ImageOverCardComponent {
    constructor() {
        this.title = this.title || "";
        this.subtitle = this.subtitle || "";
        this.imgPath = this.imgPath || "";
        this.align = this.align || "";
    }
};
__decorate([
    core_1.Input("title"),
    __metadata("design:type", String)
], ImageOverCardComponent.prototype, "title", void 0);
__decorate([
    core_1.Input("subtitle"),
    __metadata("design:type", String)
], ImageOverCardComponent.prototype, "subtitle", void 0);
__decorate([
    core_1.Input("imgPath"),
    __metadata("design:type", String)
], ImageOverCardComponent.prototype, "imgPath", void 0);
__decorate([
    core_1.Input("align"),
    __metadata("design:type", String)
], ImageOverCardComponent.prototype, "align", void 0);
ImageOverCardComponent = __decorate([
    core_1.Component({
        selector: "image-over-card",
        templateUrl: "./image-over-card.component.html",
        styleUrls: ["./image-over-card.component.scss"]
    }),
    __metadata("design:paramtypes", [])
], ImageOverCardComponent);
exports.ImageOverCardComponent = ImageOverCardComponent;
//# sourceMappingURL=image-over-card.component.js.map