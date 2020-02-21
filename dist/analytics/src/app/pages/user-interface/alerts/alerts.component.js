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
const Subject_1 = require("rxjs/Subject");
const debounceTime_1 = require("rxjs/operator/debounceTime");
let AlertsComponent = class AlertsComponent {
    constructor() {
        this.alerts = [];
        this._success = new Subject_1.Subject();
        this.staticAlertClosed = false;
        this.alerts.push({
            id: 1,
            type: 'success',
            message: 'This is an success alert',
        }, {
            id: 2,
            type: 'info',
            message: 'This is an info alert',
        }, {
            id: 3,
            type: 'warning',
            message: 'This is a warning alert',
        }, {
            id: 4,
            type: 'danger',
            message: 'This is a danger alert',
        }, {
            id: 5,
            type: 'primary',
            message: 'This is a primary alert',
        }, {
            id: 6,
            type: 'accent',
            message: 'This is a accent alert',
        }, {
            id: 7,
            type: 'light',
            message: 'This is a light alert',
        }, {
            id: 8,
            type: 'dark',
            message: 'This is a dark alert',
        });
        this.backup = this.alerts.map((alert) => Object.assign({}, alert));
    }
    closeAlert(alert) {
        const index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
    reset() {
        this.alerts = this.backup.map((alert) => Object.assign({}, alert));
    }
    ngOnInit() {
        setTimeout(() => this.staticAlertClosed = true, 20000);
        this._success.subscribe((message) => this.successMessage = message);
        debounceTime_1.debounceTime.call(this._success, 5000).subscribe(() => this.successMessage = null);
    }
    changeSuccessMessage() {
        this._success.next(`${new Date()} - Message successfully changed.`);
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], AlertsComponent.prototype, "alerts", void 0);
AlertsComponent = __decorate([
    core_1.Component({
        selector: '.content_inner_wrapper',
        templateUrl: './alerts.component.html',
        styles: [`
    :host >>> .alert-custom {
      color: #99004d;
      background-color: #f169b4;
      border-color: #800040;
    }
  `]
    }),
    __metadata("design:paramtypes", [])
], AlertsComponent);
exports.AlertsComponent = AlertsComponent;
//# sourceMappingURL=alerts.component.js.map