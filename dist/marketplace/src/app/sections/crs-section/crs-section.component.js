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
const nouislider_1 = require("nouislider");
let CrsSectionComponent = class CrsSectionComponent {
    constructor() { }
    ngOnInit() {
    }
    ngAfterViewInit() {
        var slider = document.getElementById("input-slider");
        nouislider_1.default.create(slider, {
            start: 40,
            connect: [true, false],
            range: {
                min: 0,
                max: 100
            }
        });
        var slider2 = document.getElementById("input-slider-range");
        nouislider_1.default.create(slider2, {
            start: [20, 60],
            connect: true,
            range: {
                min: 0,
                max: 100
            }
        });
    }
};
CrsSectionComponent = __decorate([
    core_1.Component({
        selector: 'app-crs-section',
        templateUrl: './crs-section.component.html',
        styleUrls: ['./crs-section.component.css']
    }),
    __metadata("design:paramtypes", [])
], CrsSectionComponent);
exports.CrsSectionComponent = CrsSectionComponent;
//# sourceMappingURL=crs-section.component.js.map