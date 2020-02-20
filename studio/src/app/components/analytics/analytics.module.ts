import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AnalyticsFrameComponent } from './analytics-frame/analytics-frame.component';

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