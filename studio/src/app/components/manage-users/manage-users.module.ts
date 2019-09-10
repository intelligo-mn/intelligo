import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BizAccountsComponent, CanActivateBizAccountComponent } from './biz-accounts/biz-accounts.component';
import { SharedModule } from '../../shared.module';
import { UsersComponent } from './users/users.component';
import { DataService } from '../../services/data.service';
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