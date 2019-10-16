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
const router_1 = require("@angular/router");
const data_models_1 = require("../../../models/data.models");
const data_service_1 = require("../../../services/data.service");
const info_dialog_service_1 = require("../../../services/info-dialog.service");
const app_header_bar_component_1 = require("../../shared/app-header-bar/app-header-bar.component");
const edit_business_account_component_1 = require("../../shared/edit-business-account/edit-business-account.component");
let BizAccountsComponent = class BizAccountsComponent {
    constructor(dataService, dialog, router, infoDialog) {
        this.dataService = dataService;
        this.dialog = dialog;
        this.router = router;
        this.infoDialog = infoDialog;
        this.page = 0;
        this.totalPages = 0;
        this.search = "";
        this.BusinessAccountStatus = data_models_1.BusinessAccountStatus;
    }
    ngAfterViewInit() {
        this.appHeader.afterInit = () => {
            this.loadAccounts();
        };
    }
    prevPage() {
        if (this.page > 0) {
            this.page--;
            this.loadAccounts();
        }
    }
    nextPage() {
        if (this.page < this.totalPages) {
            this.page++;
            this.loadAccounts();
        }
    }
    searchStart() {
        this.page = 0;
        this.loadAccounts();
    }
    loadAccounts() {
        this.infoDialog.showSpinner();
        this.dataService.getBusinessAccounts(this.search, this.page).subscribe(x => {
            this.infoDialog.hideSpinner();
            if (x.success) {
                this.accounts = x.data.content;
                this.totalPages = x.data.totalPages;
            }
            else
                this.dataService.handleTypedError(x.error, "Unable to load business accounts", "Something went wrong while loading business accounts. Please try again.");
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Unable to load business accounts", "Something went wrong while loading business accounts. Please try again.");
        });
    }
    manageUsers(account) {
        this.router.navigateByUrl(`/manage-users/users?bizId=${account.id}`);
    }
    editBusinessAccount(data) {
        let d = this.dialog.open(edit_business_account_component_1.EditBusinessAccountComponent, {
            width: '40%',
            data: data
        });
        d.afterClosed().subscribe(x => {
            if (x == true) {
                this.loadAccounts();
            }
        });
    }
    updateBusinessAccountStatus(account, status) {
        let work = (status == data_models_1.BusinessAccountStatus.ACTIVE ? "activate" : "deactivate");
        this.infoDialog.confirm("Confirmation", `Are you sure you want to ${work} the business account?`, (ok) => {
            if (ok) {
                this.infoDialog.showSpinner();
                this.dataService.updateBusinessAccountStatus(account, status).subscribe(x => {
                    this.infoDialog.hideSpinner();
                    if (x.success) {
                        this.infoDialog.alert("Done", "Business account status updated");
                        this.loadAccounts();
                    }
                    else {
                        this.dataService.handleTypedError(x.error, "Unable to update business account status", "Something went wrong while updating the business account. Please try again.");
                    }
                }, err => {
                    this.infoDialog.hideSpinner();
                    this.dataService.handleError(err, "Unable to update business account status", "Something went wrong while updating the business account. Please try again.");
                });
            }
        });
    }
};
__decorate([
    core_1.ViewChild('appHeader', { static: false }),
    __metadata("design:type", app_header_bar_component_1.AppHeaderBarComponent)
], BizAccountsComponent.prototype, "appHeader", void 0);
BizAccountsComponent = __decorate([
    core_1.Component({
        selector: 'app-biz-accounts',
        templateUrl: './biz-accounts.component.html',
        styleUrls: ['./biz-accounts.component.scss']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService,
        material_1.MatDialog,
        router_1.Router,
        info_dialog_service_1.InfoDialogService])
], BizAccountsComponent);
exports.BizAccountsComponent = BizAccountsComponent;
let CanActivateBizAccountComponent = class CanActivateBizAccountComponent {
    constructor(dataService) {
        this.dataService = dataService;
    }
    canActivate(route, state) {
        return this.dataService.isSuperAdmin();
    }
};
CanActivateBizAccountComponent = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [data_service_1.DataService])
], CanActivateBizAccountComponent);
exports.CanActivateBizAccountComponent = CanActivateBizAccountComponent;
//# sourceMappingURL=biz-accounts.component.js.map