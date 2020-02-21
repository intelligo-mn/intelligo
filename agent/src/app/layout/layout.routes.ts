import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { LoginComponent } from "app/pages/authentication/login/login.component";
import { LoginModule } from "app/pages/authentication/login/login.module";
import { AuthGuardService } from 'app/shared/services/data/auth-guard.service';
const LAYOUT_ROUTES: Routes = [
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
		canActivateChild: [AuthGuardService],
		loadChildren: "../pages/chat/chat.module#ChatModule"
	},
	{ path: "**", redirectTo: "" }
];

export const LayoutRoutes = RouterModule.forChild(LAYOUT_ROUTES);
