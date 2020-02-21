"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const sweetalert2_1 = require("sweetalert2");
let NotificationsDialogsComponent = class NotificationsDialogsComponent {
    constructor() {
        this.title = 'Alerts &amp; Dialogs';
    }
    sweetMessage() {
        sweetalert2_1.default(`Here's a simple message`);
    }
    sweetError() {
        sweetalert2_1.default({
            title: 'Error!',
            text: 'Do you want to continue',
            type: 'error',
            confirmButtonText: 'Cool'
        });
    }
    sweetSuccess() {
        sweetalert2_1.default("Good job!", "You clicked the button!", "success");
    }
    sweetText() {
        sweetalert2_1.default({
            title: 'Input something',
            input: 'text',
            showCancelButton: true,
            inputValidator: function (value) {
                return new Promise(function (resolve, reject) {
                    if (value) {
                        resolve();
                    }
                    else {
                        reject('You need to write something!');
                    }
                });
            }
        }).then(function (result) {
            sweetalert2_1.default({
                type: 'success',
                html: 'You entered: ' + result
            });
        }).catch(sweetalert2_1.default.noop);
    }
    sweetEmail() {
        sweetalert2_1.default({
            title: 'Input email address',
            input: 'email'
        }).then(function (email) {
            sweetalert2_1.default({
                type: 'success',
                html: 'Entered email: ' + email
            });
        }).catch(sweetalert2_1.default.noop);
    }
    sweetUrl() {
        sweetalert2_1.default({
            title: 'Input URL',
            input: 'url'
        }).then(function (url) {
            sweetalert2_1.default({
                type: 'success',
                html: 'Entered URL: ' + url
            });
        }).catch(sweetalert2_1.default.noop);
    }
    sweetTextarea() {
        sweetalert2_1.default({
            input: 'textarea',
            showCancelButton: true
        }).then(function (text) {
            if (text) {
                sweetalert2_1.default(text);
            }
        }).catch(sweetalert2_1.default.noop);
    }
};
NotificationsDialogsComponent = __decorate([
    core_1.Component({
        selector: '.content_inner_wrapper',
        templateUrl: './notifications-dialogs.component.html',
        styleUrls: ['./notifications-dialogs.component.scss']
    })
], NotificationsDialogsComponent);
exports.NotificationsDialogsComponent = NotificationsDialogsComponent;
//# sourceMappingURL=notifications-dialogs.component.js.map