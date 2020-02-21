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
const themeA = require('../../styles/themes/theme-a.scss');
const themeB = require('../../styles/themes/theme-b.scss');
const themeC = require('../../styles/themes/theme-c.scss');
const themeD = require('../../styles/themes/theme-d.scss');
const themeE = require('../../styles/themes/theme-e.scss');
const themeF = require('../../styles/themes/theme-f.scss');
const themeG = require('../../styles/themes/theme-g.scss');
const themeH = require('../../styles/themes/theme-h.scss');
let ThemesService = class ThemesService {
    constructor() {
        this.defaultTheme = 'A';
        this.createStyle();
        this.setTheme(this.defaultTheme);
    }
    createStyle() {
        const head = document.head || document.getElementsByTagName('head')[0];
        this.styleTag = document.createElement('style');
        this.styleTag.type = 'text/css';
        this.styleTag.id = 'appthemes';
        head.appendChild(this.styleTag);
    }
    setTheme(name) {
        switch (name) {
            case 'A':
                this.injectStylesheet(themeA);
                break;
            case 'B':
                this.injectStylesheet(themeB);
                break;
            case 'C':
                this.injectStylesheet(themeC);
                break;
            case 'D':
                this.injectStylesheet(themeD);
                break;
            case 'E':
                this.injectStylesheet(themeE);
                break;
            case 'F':
                this.injectStylesheet(themeF);
                break;
            case 'G':
                this.injectStylesheet(themeG);
                break;
            case 'H':
                this.injectStylesheet(themeH);
                break;
        }
    }
    injectStylesheet(css) {
        this.styleTag.innerHTML = css;
    }
    getDefaultTheme() {
        return this.defaultTheme;
    }
};
ThemesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ThemesService);
exports.ThemesService = ThemesService;
//# sourceMappingURL=themes.service.js.map