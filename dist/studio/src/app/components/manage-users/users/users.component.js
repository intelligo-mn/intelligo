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
const data_service_1 = require("../../../services/data.service");
const info_dialog_service_1 = require("../../../services/info-dialog.service");
const app_header_bar_component_1 = require("../../shared/app-header-bar/app-header-bar.component");
const create_user_component_1 = require("../../shared/create-user/create-user.component");
const update_password_component_1 = require("../../shared/update-password/update-password.component");
let UsersComponent = class UsersComponent {
    constructor(route, router, infoDialog, dialog, dataService) {
        this.route = route;
        this.router = router;
        this.infoDialog = infoDialog;
        this.dialog = dialog;
        this.dataService = dataService;
        this.search = "";
        this.users = [];
        this.page = 0;
        this.totalPages = 0;
    }
    ngAfterViewInit() {
        this.appHeader.afterInit = () => {
            this.route.queryParamMap.subscribe(x => {
                let bizId = x.get('bizId');
                if (bizId) {
                    this.bizId = bizId;
                    this.loadUsers();
                    this.loadBusinessDetails();
                }
            });
        };
        this.appHeader.goBack = () => {
            if (this.dataService.isSuperAdmin()) {
                this.router.navigateByUrl('/manage-users');
            }
            else {
                this.router.navigateByUrl('/');
            }
        };
    }
    ngOnInit() {
    }
    searchStart() {
        this.page = 0;
        this.loadUsers();
    }
    loadBusinessDetails() {
        this.infoDialog.showSpinner();
        this.dataService.getBusinessDetails(this.bizId).subscribe(x => {
            this.infoDialog.hideSpinner();
            this.businessAccount = x.data;
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Unable to load business details", "Something went wrong while trying to load business account details. Please try again.");
        });
    }
    createUserDialog() {
        let d = this.dialog.open(create_user_component_1.CreateUserComponent, {
            width: '60%',
            data: {
                bizId: this.bizId,
                mode: create_user_component_1.UserDialogMode.Create,
            }
        });
        d.afterClosed().subscribe(x => {
            if (x == true)
                this.loadUsers();
        });
    }
    prevPage() {
        if (this.page > 0) {
            this.page--;
            this.loadUsers();
        }
    }
    nextPage() {
        if (this.page < this.totalPages) {
            this.page++;
            this.loadUsers();
        }
    }
    view(user) {
        this.dialog.open(create_user_component_1.CreateUserComponent, {
            width: '60%',
            data: {
                mode: create_user_component_1.UserDialogMode.View,
                user: user
            }
        });
    }
    loadUsers() {
        if (this.bizId) {
            this.infoDialog.showSpinner();
            this.dataService.getUsers(this.bizId, this.search, this.page).subscribe(x => {
                this.infoDialog.hideSpinner();
                this.users = x.content;
                this.totalPages = x.totalPages;
            }, err => {
                this.infoDialog.hideSpinner();
                this.dataService.handleError(err, "Unable to load users", "Something went wrong while loading the users. Please try again.");
            });
        }
    }
    updateUserPassword(user) {
        this.dialog.open(update_password_component_1.UpdatePasswordComponent, {
            width: '40%',
            data: user
        });
    }
    userRole(user) {
        if (user.roles) {
            return user.roles.map(x => x.label).join(', ');
        }
        return "";
    }
};
__decorate([
    core_1.ViewChild(app_header_bar_component_1.AppHeaderBarComponent, { static: false }),
    __metadata("design:type", app_header_bar_component_1.AppHeaderBarComponent)
], UsersComponent.prototype, "appHeader", void 0);
UsersComponent = __decorate([
    core_1.Component({
        selector: 'app-users',
        templateUrl: './users.component.html',
        styleUrls: ['./users.component.scss']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        info_dialog_service_1.InfoDialogService,
        material_1.MatDialog,
        data_service_1.DataService])
], UsersComponent);
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map