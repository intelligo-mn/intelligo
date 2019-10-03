import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { BizAccountsComponent, CanActivateBizAccountComponent } from './biz-accounts/biz-accounts.component';
import { UsersComponent } from './users/users.component';
export const MANAGE_USERS_ROUTES: Routes = [
	{
		path: "",
		component: BizAccountsComponent,
		canActivate: [CanActivateBizAccountComponent]
	},
	{
		path: "users",
		component: UsersComponent
	}
];

@NgModule({
	declarations: [
		BizAccountsComponent,
		UsersComponent
	],
	imports: [
		SharedModule
	],
	providers: [
		CanActivateBizAccountComponent
	]
})
export class ManageUsersModule { }