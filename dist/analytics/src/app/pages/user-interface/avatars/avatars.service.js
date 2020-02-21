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
let AvatarsService = class AvatarsService {
    constructor() {
        this.avatars = [
            { name: 'Alease Salvas', title: 'UI/UX Designer', subtitle: 'User experience design, strategy, and innovation consultancy' },
            { name: 'Annalisa Chamber', title: 'Web Deveoper', subtitle: 'We aim to sustainably verify 100% of the world’s coffee production' },
            { name: 'Becky Staudt', title: 'Database Administrator', subtitle: 'Building, learning & winning together.' },
            { name: 'Brett Curnutte', title: 'User Interface Developer', subtitle: 'We build innovative brands and compelling experiences.' },
            { name: 'Chara Hilliard', title: 'UI/UX Designer', subtitle: 'User experience design, strategy, and innovation consultancy' },
            { name: 'Dwayne Chagoyar', title: 'Web Deveoper', subtitle: 'We aim to sustainably verify 100% of the world’s coffee production' },
            { name: 'Eartha Heavener', title: 'Database Administrator', subtitle: 'Building, learning & winning together.' },
            { name: 'Florentino Tester', title: 'User Interface Developer', subtitle: 'We build innovative brands and compelling experiences.' },
            { name: 'Giuseppe Lester', title: 'UI/UX Designer', subtitle: 'User experience design, strategy, and innovation consultancy' },
            { name: 'Hulda Louder', title: 'Web Deveoper', subtitle: 'We aim to sustainably verify 100% of the world’s coffee production' },
            { name: 'Jenell Hover', title: 'Database Administrator', subtitle: 'Building, learning & winning together.' },
            { name: 'Meaghan Gervais', title: 'User Interface Developer', subtitle: 'We build innovative brands and compelling experiences.' },
            { name: 'Shon Fulford', title: 'UI/UX Designer', subtitle: 'User experience design, strategy, and innovation consultancy' },
            { name: 'Tracey Blanchette', title: 'Web Deveoper', subtitle: 'We aim to sustainably verify 100% of the world’s coffee production' },
            { name: 'Will Blackshear', title: 'Database Administrator', subtitle: 'Building, learning & winning together.' }
        ];
    }
};
AvatarsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], AvatarsService);
exports.AvatarsService = AvatarsService;
//# sourceMappingURL=avatars.service.js.map