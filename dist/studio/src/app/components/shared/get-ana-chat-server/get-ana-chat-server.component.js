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
const material_1 = require("@angular/material");
const ana_cloud_signup_component_1 = require("../ana-cloud-signup/ana-cloud-signup.component");
let GetAnaChatServerComponent = class GetAnaChatServerComponent {
    constructor(dialog) {
        this.dialog = dialog;
    }
    ngOnInit() {
    }
    selfHost() {
    }
    anaCloud() {
        let d = this.dialog.open(ana_cloud_signup_component_1.AnaCloudSignupComponent, {
            width: 'auto'
        });
    }
};
GetAnaChatServerComponent = __decorate([
    core_1.Component({
        selector: 'app-get-ana-chat-server',
        templateUrl: './get-ana-chat-server.component.html',
        styleUrls: ['./get-ana-chat-server.component.scss']
    }),
    __metadata("design:paramtypes", [material_1.MatDialog])
], GetAnaChatServerComponent);
exports.GetAnaChatServerComponent = GetAnaChatServerComponent;
//# sourceMappingURL=get-ana-chat-server.component.js.map