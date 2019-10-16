"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../shared.module");
const biz_accounts_component_1 = require("./biz-accounts/biz-accounts.component");
const users_component_1 = require("./users/users.component");
exports.MANAGE_USERS_ROUTES = [
    {
        path: "",
        component: biz_accounts_component_1.BizAccountsComponent,
        canActivate: [biz_accounts_component_1.CanActivateBizAccountComponent]
    },
    {
        path: "users",
        component: users_component_1.UsersComponent
    }
];
let ManageUsersModule = class ManageUsersModule {
};
ManageUsersModule = __decorate([
    core_1.NgModule({
        declarations: [
            biz_accounts_component_1.BizAccountsComponent,
            users_component_1.UsersComponent
        ],
        imports: [
            shared_module_1.SharedModule
        ],
        providers: [
            biz_accounts_component_1.CanActivateBizAccountComponent
        ]
    })
], ManageUsersModule);
exports.ManageUsersModule = ManageUsersModule;
//# sourceMappingURL=manage-users.module.js.map