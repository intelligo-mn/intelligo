import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DeployLandingComponent } from './landing/deploy-landing/deploy-landing.component';

export const DEPLOY_ROUTES: Routes = [
	{
		path: "",
		component: DeployLandingComponent
	}
];

@NgModule({
	declarations: [
		DeployLandingComponent
	],
	entryComponents: [

	],
	imports: [
		SharedModule
	],
	schemas: [

	],
})
export class DeployModule { }

