import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertsComponent } from './alerts.component';
import { SharedModule } from '../../../shared/shared.module';


const ALERTS_ROUTE = [
    { path: '', component: AlertsComponent },
];

@NgModule({
	  declarations: [AlertsComponent],
    imports: [
			CommonModule,
			SharedModule,
			RouterModule.forChild(ALERTS_ROUTE)
    ]
  
})
export class AlertsModule { }
