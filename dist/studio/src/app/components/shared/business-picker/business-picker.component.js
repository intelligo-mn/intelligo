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
const core_1 = require("@angular/core");
const data_service_1 = require("../../../services/data.service");
const info_dialog_service_1 = require("../../../services/info-dialog.service");
const material_1 = require("@angular/material");
const analytics_window_service_1 = require("../../../services/analytics-window.service");
const router_1 = require("@angular/router");
let BusinessPickerComponent = class BusinessPickerComponent {
    constructor(dataService, infoDialog, router, analyticsWindow, dialogRef, param) {
        this.dataService = dataService;
        this.infoDialog = infoDialog;
        this.router = router;
        this.analyticsWindow = analyticsWindow;
        this.dialogRef = dialogRef;
        this.param = param;
        this.title = "";
        this.businessAccounts = [];
        this.bizFilter = "";
        this.chatProjects = [];
        this.projFilter = "";
        if (this.param.askFlowId) {
            this.title = "Choose business account and chat project";
        }
        else {
            this.title = "Choose business account";
        }
    }
    ngOnInit() {
        Promise.resolve(null).then(() => {
            this.init();
        });
    }
    init() {
        this.infoDialog.showSpinner();
        this.dataService.getBusinessAccounts("", 0, 10000).subscribe(x => {
            this.infoDialog.hideSpinner();
            if (x.success) {
                this.businessAccounts = x.data.content;
                if (this.param && this.param.businessId && this.businessAccounts) {
                    let x = this.businessAccounts.filter(x => x.id == this.param.businessId);
                    if (x && x.length > 0) {
                        this.selectedBusinessAccount = x[0];
                        this.bizFilter = this.selectedBusinessAccount;
                        this.loadChatProjects();
                    }
                }
            }
            else {
                this.dataService.handleTypedError(x.error, "Unable to load business accounts", "Something went wrong while loading business account. Please try again.");
            }
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Unable to load business accounts", "Something went wrong while loading business account. Please try again.");
        });
    }
    bizOptionSelected(event) {
        if (event.option && event.option.value) {
            this.selectedBusinessAccount = event.option.value;
            if (this.selectedBusinessAccount) {
                this.loadChatProjects();
            }
        }
    }
    bizDisplayWith(value) {
        return value ? value.name : null;
    }
    bizFilteredOptions() {
        if (typeof this.bizFilter === 'string') {
            let list = this.businessAccounts;
            if (this.bizFilter) {
                list = this.businessAccounts.filter(x => (x.name.toLowerCase().indexOf(this.bizFilter.toLowerCase()) != -1) || x.id.toLowerCase().indexOf(this.bizFilter.toLowerCase()) != -1);
            }
            return list.sort((x, y) => ((x.name && y.name) ? x.name.localeCompare(y.name) : 1));
        }
    }
    projOptionSelected(event) {
        if (event.option && event.option.value) {
            this.selectedChatProject = event.option.value;
        }
    }
    projDisplayWith(value) {
        return value ? value.name : null;
    }
    projFilteredOptions() {
        if (typeof this.projFilter === 'string') {
            let list = this.chatProjects;
            if (this.projFilter) {
                list = this.chatProjects.filter(x => (x.name.toLowerCase().indexOf(this.projFilter.toLowerCase()) != -1) || x.id.toLowerCase().indexOf(this.projFilter.toLowerCase()) != -1);
            }
            return list.sort((x, y) => ((x.name && y.name) ? x.name.localeCompare(y.name) : 1));
        }
    }
    loadChatProjects() {
        if (!this.param.askFlowId)
            return false;
        if (!this.selectedBusinessAccount)
            return false;
        this.infoDialog.showSpinner();
        this.dataService.getChatProjects(this.selectedBusinessAccount.id, 0, 10000).subscribe(x => {
            this.infoDialog.hideSpinner();
            if (x.success) {
                this.chatProjects = x.data.content;
            }
            else {
                this.dataService.handleTypedError(x.error, "Unable to fetch chat projects", "Something went wrong while trying to fetch chat projects. Please try again.");
            }
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Unable to fetch chat projects", "Something went wrong while trying to fetch chat projects. Please try again.");
        });
    }
    submit() {
        this.dialogRef.close({
            bizAccount: this.selectedBusinessAccount,
            chatProj: this.selectedChatProject
        });
    }
    valid() {
        if (this.param.askFlowId) {
            return this.selectedBusinessAccount && this.selectedChatProject;
        }
        else {
            return this.selectedBusinessAccount;
        }
    }
    get chatConnName() {
        return this.dataService.chatServer.Name;
    }
};
BusinessPickerComponent = __decorate([
    core_1.Component({
        selector: 'app-business-picker',
        templateUrl: './business-picker.component.html',
        styleUrls: ['./business-picker.component.scss']
    }),
    __param(5, core_1.Inject(material_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [data_service_1.DataService,
        info_dialog_service_1.InfoDialogService,
        router_1.Router,
        analytics_window_service_1.AnalyticsWindowService,
        material_1.MatDialogRef, Object])
], BusinessPickerComponent);
exports.BusinessPickerComponent = BusinessPickerComponent;
//# sourceMappingURL=business-picker.component.js.map