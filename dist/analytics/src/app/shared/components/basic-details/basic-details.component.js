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
var _a, _b, _c;
const core_1 = require("@angular/core");
const material_1 = require("@angular/material");
const data_service_1 = require("app/shared/services/data/data.service");
let BasicDetailsComponent = class BasicDetailsComponent {
    constructor(dataService, dialog, dialogRef, param) {
        this.dataService = dataService;
        this.dialog = dialog;
        this.dialogRef = dialogRef;
        this.param = param;
        this.details = {
            apiBase: "",
            businessId: "",
            businessName: ""
        };
        let d = localStorage.getItem('b_details');
        if (d) {
            this.details = JSON.parse(d);
        }
    }
    ngOnInit() {
    }
    done() {
        if (this.details.apiBase && this.details.businessId && this.details.businessName) {
            this.error = null;
            this.dataService.apiBase = this.details.apiBase;
            this.dataService.businessId = this.details.businessId;
            this.dataService.businessName = this.details.businessName;
            this.dataService.chatFlowId = this.details.businessId;
            localStorage.setItem('b_details', JSON.stringify(this.details));
            this.dialogRef.close(true);
        }
        else {
            this.error = "Please fill all the details";
        }
    }
};
BasicDetailsComponent = __decorate([
    core_1.Component({
        selector: 'app-basic-details',
        templateUrl: './basic-details.component.html',
        styleUrls: ['./basic-details.component.scss']
    }),
    __param(3, core_1.Optional()),
    __param(3, core_1.Inject(material_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [typeof (_a = typeof data_service_1.DataService !== "undefined" && data_service_1.DataService) === "function" ? _a : Object, typeof (_b = typeof material_1.MatDialog !== "undefined" && material_1.MatDialog) === "function" ? _b : Object, typeof (_c = typeof material_1.MatDialogRef !== "undefined" && material_1.MatDialogRef) === "function" ? _c : Object, Object])
], BasicDetailsComponent);
exports.BasicDetailsComponent = BasicDetailsComponent;
//# sourceMappingURL=basic-details.component.js.map