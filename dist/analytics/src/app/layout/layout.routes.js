"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const layout_component_1 = require("./layout.component");
const base_component_1 = require("../BaseComponent/base.component");
const LAYOUT_ROUTES = [
    {
        path: "error/404",
        loadChildren: "../pages/error/404/404.module#Error404Module"
    },
    {
        path: "error/500",
        loadChildren: "../pages/error/500/500.module#Error500Module"
    },
    {
        path: "",
        component: layout_component_1.LayoutComponent,
        children: [
            {
                path: "",
                component: base_component_1.BaseComponent,
            },
            {
                path: "dashboards",
                loadChildren: "../pages/dashboards/dashboards.module#DashboardsModule",
            },
            {
                path: "behaviourflow",
                loadChildren: "../pages/graphView/graphview.module#GraphViewModule",
            },
            {
                path: "analytics",
                loadChildren: "../pages/analytics/analytics.module#AnalyticsModule"
            },
            {
                path: "goalconversion",
                loadChildren: "../pages/goalConversion/goalConversion.module#GoalConversionModule"
            },
            {
                path: "agentdashboard",
                loadChildren: "../pages/agentDashboard/agentdashboard.module#AgentDashboardModule"
            },
            {
                path: "agentanalytics",
                loadChildren: "../pages/agentAnalytics/agentAnalytics.module#AgentAnalyticsModule"
            },
            {
                path: "usersdata",
                loadChildren: "../pages/leads/leads.module#LeadsModule"
            },
            {
                path: "support",
                loadChildren: "../pages/support/support.module#SupportModule"
            },
            {
                path: "helper-classes",
                loadChildren: "../pages/helper-classes/helper-classes.module#HelperClassesModule"
            }
        ]
    },
    { path: "**", redirectTo: "dashboards" }
];
exports.LayoutRoutes = router_1.RouterModule.forChild(LAYOUT_ROUTES);
//# sourceMappingURL=layout.routes.js.map