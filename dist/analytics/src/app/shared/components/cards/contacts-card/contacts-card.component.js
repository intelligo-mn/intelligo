"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let ContactsCardComponent = class ContactsCardComponent {
};
ContactsCardComponent = __decorate([
    core_1.Component({
        selector: "contacts-card",
        templateUrl: "./contacts-card.component.html",
        styleUrls: ["./contacts-card.component.scss"]
    })
], ContactsCardComponent);
exports.ContactsCardComponent = ContactsCardComponent;
//# sourceMappingURL=contacts-card.component.js.map