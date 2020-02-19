import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DrawersComponent } from './drawers.component';
import { SharedModule } from '../../../shared/shared.module';


const DRAWERS_ROUTE = [
    { path: '', component: DrawersComponent },
];

@NgModule({
	  declarations: [DrawersComponent],
    imports: [
			CommonModule,
			SharedModule,
			RouterModule.forChild(DRAWERS_ROUTE)
    ]
  
})
export class DrawersModule { }
