import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { BaseComponent } from "../BaseComponent/base.component"

const LAYOUT_ROUTES: Routes = [

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
		component: LayoutComponent,
		children: [
			{
				path: "",
				component: BaseComponent,
			},
			//---------------------------------------------------------->
			//Dashboards
			//---------------------------------------------------------->
			{
				path: "dashboards",
				loadChildren: "../pages/dashboards/dashboards.module#DashboardsModule",
			},
			{
				path:"behaviourflow",
				loadChildren:"../pages/graphView/graphview.module#GraphViewModule",
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
			//---------------------------------------------------------->
			//Page Layouts
			//---------------------------------------------------------->
			//
			//---------------------------------------------------------->
			//Helper Classes
			//---------------------------------------------------------->
			{
				path: "helper-classes",
				loadChildren: "../pages/helper-classes/helper-classes.module#HelperClassesModule"
			}

		]
	},

	// 404 Page Not Found
	{ path: "**", redirectTo: "dashboards" }
];

export const LayoutRoutes = RouterModule.forChild(LAYOUT_ROUTES);
