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
let ChainDelayService = class ChainDelayService {
    constructor() {
        this.queue = [];
    }
    schedule(fn, t) {
        this.timer = setTimeout(() => {
            this.timer = null;
            fn(this.queue.length);
            if (this.queue.length) {
                let item = this.queue.shift();
                this.schedule(item.fn, item.t);
            }
        }, t);
    }
    ;
    delay(fn, t) {
        if (this.queue.length || this.timer) {
            this.queue.push({ fn: fn, t: t });
        }
        else {
            this.schedule(fn, t);
        }
    }
    ;
    cancel() {
        clearTimeout(this.timer);
        this.queue = [];
    }
    ;
};
ChainDelayService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ChainDelayService);
exports.ChainDelayService = ChainDelayService;
//# sourceMappingURL=chain-delay.service.js.map