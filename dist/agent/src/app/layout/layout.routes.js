"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const auth_guard_service_1 = require("app/shared/services/data/auth-guard.service");
const LAYOUT_ROUTES = [
    {
        path: "authentication/lock",
        loadChildren: "../pages/authentication/lock/lock.module#LockModule"
    },
    {
        path: "authentication/login",
        loadChildren: "../pages/authentication/login/login.module#LoginModule"
    },
    {
        path: "",
        loadChildren: "../pages/authentication/login/login.module#LoginModule"
    },
    {
        path: "chat",
        canActivateChild: [auth_guard_service_1.AuthGuardService],
        loadChildren: "../pages/chat/chat.module#ChatModule"
    },
    { path: "**", redirectTo: "" }
];
exports.LayoutRoutes = router_1.RouterModule.forChild(LAYOUT_ROUTES);
//# sourceMappingURL=layout.routes.js.map