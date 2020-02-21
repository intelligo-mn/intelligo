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
var _a, _b, _c, _d, _e;
const core_1 = require("@angular/core");
const material_1 = require("@angular/material");
const Z_INDEX_ITEM = 23;
let SmdFabSpeedDialTriggerComponent = class SmdFabSpeedDialTriggerComponent {
    constructor(_parent) {
        this._parent = _parent;
        this.spin = false;
    }
    get sp() {
        return this.spin;
    }
    _onClick(event) {
        if (!this._parent.fixed) {
            this._parent.toggle();
            event.stopPropagation();
        }
    }
};
__decorate([
    core_1.HostBinding("class.smd-spin"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], SmdFabSpeedDialTriggerComponent.prototype, "sp", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SmdFabSpeedDialTriggerComponent.prototype, "spin", void 0);
__decorate([
    core_1.HostListener("click", ["$event"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SmdFabSpeedDialTriggerComponent.prototype, "_onClick", null);
SmdFabSpeedDialTriggerComponent = __decorate([
    core_1.Component({
        selector: "smd-fab-trigger",
        template: `
        <ng-content select="[mat-fab], [mat-fab]"></ng-content>
    `
    }),
    __param(0, core_1.Inject(core_1.forwardRef(() => SmdFabSpeedDialComponent))),
    __metadata("design:paramtypes", [SmdFabSpeedDialComponent])
], SmdFabSpeedDialTriggerComponent);
exports.SmdFabSpeedDialTriggerComponent = SmdFabSpeedDialTriggerComponent;
let SmdFabSpeedDialActionsComponent = class SmdFabSpeedDialActionsComponent {
    constructor(_parent, renderer) {
        this._parent = _parent;
        this.renderer = renderer;
    }
    ngAfterContentInit() {
        this._buttons.changes.subscribe(() => {
            this.initButtonStates();
            this._parent.setActionsVisibility();
        });
        this.initButtonStates();
    }
    initButtonStates() {
        this._buttons.toArray().forEach((button, i) => {
            this.renderer.setElementClass(button._getHostElement(), "smat-fab-action-item", true);
            this.changeElementStyle(button._getHostElement(), "z-index", "" + (Z_INDEX_ITEM - i));
        });
    }
    show() {
        if (this._buttons) {
            this._buttons.toArray().forEach((button, i) => {
                let transitionDelay = 0;
                let transform;
                if (this._parent.animationMode === "scale") {
                    transitionDelay = 3 + 65 * i;
                    transform = "scale(1)";
                }
                else {
                    transform = this.getTranslateFunction("0");
                }
                this.changeElementStyle(button._getHostElement(), "transition-delay", transitionDelay + "ms");
                this.changeElementStyle(button._getHostElement(), "opacity", "1");
                this.changeElementStyle(button._getHostElement(), "transform", transform);
            });
        }
    }
    hide() {
        if (this._buttons) {
            this._buttons.toArray().forEach((button, i) => {
                let opacity = "1";
                let transitionDelay = 0;
                let transform;
                if (this._parent.animationMode === "scale") {
                    transitionDelay = 3 - 65 * i;
                    transform = "scale(0)";
                    opacity = "0";
                }
                else {
                    transform = this.getTranslateFunction(55 * (i + 1) - i * 5 + "px");
                }
                this.changeElementStyle(button._getHostElement(), "transition-delay", transitionDelay + "ms");
                this.changeElementStyle(button._getHostElement(), "opacity", opacity);
                this.changeElementStyle(button._getHostElement(), "transform", transform);
            });
        }
    }
    getTranslateFunction(value) {
        let dir = this._parent.direction;
        let translateFn = dir === "up" || dir === "down" ? "translateY" : "translateX";
        let sign = dir === "down" || dir === "right" ? "-" : "";
        return translateFn + "(" + sign + value + ")";
    }
    changeElementStyle(elem, style, value) {
        this.renderer.setElementStyle(elem, style, value);
    }
};
__decorate([
    core_1.ContentChildren(material_1.MatButton),
    __metadata("design:type", typeof (_a = typeof core_1.QueryList !== "undefined" && core_1.QueryList) === "function" ? _a : Object)
], SmdFabSpeedDialActionsComponent.prototype, "_buttons", void 0);
SmdFabSpeedDialActionsComponent = __decorate([
    core_1.Component({
        selector: "smd-fab-actions",
        template: `
        <ng-content select="[mat-mini-fab], [mat-mini-fab]"></ng-content>
    `
    }),
    __param(0, core_1.Inject(core_1.forwardRef(() => SmdFabSpeedDialComponent))),
    __metadata("design:paramtypes", [SmdFabSpeedDialComponent, typeof (_b = typeof core_1.Renderer !== "undefined" && core_1.Renderer) === "function" ? _b : Object])
], SmdFabSpeedDialActionsComponent);
exports.SmdFabSpeedDialActionsComponent = SmdFabSpeedDialActionsComponent;
let SmdFabSpeedDialComponent = class SmdFabSpeedDialComponent {
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.isInitialized = false;
        this._direction = "up";
        this._open = false;
        this._animationMode = "fling";
        this.fixed = false;
        this.openChange = new core_1.EventEmitter();
    }
    get open() {
        return this._open;
    }
    set open(open) {
        let previousOpen = this._open;
        this._open = open;
        if (previousOpen !== this._open) {
            this.openChange.emit(this._open);
            if (this.isInitialized) {
                this.setActionsVisibility();
            }
        }
    }
    get direction() {
        return this._direction;
    }
    set direction(direction) {
        let previousDir = this._direction;
        this._direction = direction;
        if (previousDir !== this.direction) {
            this._setElementClass(previousDir, false);
            this._setElementClass(this.direction, true);
            if (this.isInitialized) {
                this.setActionsVisibility();
            }
        }
    }
    get animationMode() {
        return this._animationMode;
    }
    set animationMode(animationMode) {
        let previousAnimationMode = this._animationMode;
        this._animationMode = animationMode;
        if (previousAnimationMode !== this._animationMode) {
            this._setElementClass(previousAnimationMode, false);
            this._setElementClass(this.animationMode, true);
            if (this.isInitialized) {
                Promise.resolve(null).then(() => (this.open = false));
            }
        }
    }
    ngAfterContentInit() {
        this.isInitialized = true;
        this.setActionsVisibility();
        this._setElementClass(this.direction, true);
        this._setElementClass(this.animationMode, true);
    }
    toggle() {
        this.open = !this.open;
    }
    _onClick() {
        if (!this.fixed && this.open) {
            this.open = false;
        }
    }
    setActionsVisibility() {
        if (this.open) {
            this._childActions.show();
        }
        else {
            this._childActions.hide();
        }
    }
    _setElementClass(elemClass, isAdd) {
        this.renderer.setElementClass(this.elementRef.nativeElement, `smd-${elemClass}`, isAdd);
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SmdFabSpeedDialComponent.prototype, "fixed", void 0);
__decorate([
    core_1.HostBinding("class.smd-opened"),
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], SmdFabSpeedDialComponent.prototype, "open", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], SmdFabSpeedDialComponent.prototype, "direction", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], SmdFabSpeedDialComponent.prototype, "animationMode", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", typeof (_c = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _c : Object)
], SmdFabSpeedDialComponent.prototype, "openChange", void 0);
__decorate([
    core_1.ContentChild(SmdFabSpeedDialActionsComponent),
    __metadata("design:type", SmdFabSpeedDialActionsComponent)
], SmdFabSpeedDialComponent.prototype, "_childActions", void 0);
__decorate([
    core_1.HostListener("click"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SmdFabSpeedDialComponent.prototype, "_onClick", null);
SmdFabSpeedDialComponent = __decorate([
    core_1.Component({
        selector: "smd-fab-speed-dial",
        template: `
        <div class="smat-fab-speed-dial-container">
            <ng-content select="smat-fab-trigger"></ng-content>
            <ng-content select="smat-fab-actions"></ng-content>
        </div>
    `,
        styleUrls: ["fab.component.scss"],
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _d : Object, typeof (_e = typeof core_1.Renderer !== "undefined" && core_1.Renderer) === "function" ? _e : Object])
], SmdFabSpeedDialComponent);
exports.SmdFabSpeedDialComponent = SmdFabSpeedDialComponent;
//# sourceMappingURL=fab.component.js.map