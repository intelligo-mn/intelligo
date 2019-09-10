import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { AnalyticsFrameComponent, CanActivateAnalyticsFrameComponent } from './analytics-frame/analytics-frame.component';
import { DataService } from '../../services/data.service';

export const ANALYTICS_ROUTES: Routes = [
	{
		path: "",
		component: AnalyticsFrameComponent
	}
];

@NgModule({
	declarations: [
		AnalyticsFrameComponent
	],
	imports: [
		SharedModule
	]
})
export class AnalyticsModule { }