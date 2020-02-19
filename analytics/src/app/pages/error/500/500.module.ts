import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Error500Component } from './500.component';
import { SharedModule } from '../../../shared/shared.module';


const ERROR_500_ROUTE = [
    { path: '', component: Error500Component },
];

@NgModule({
	  declarations: [Error500Component],
    imports: [
			CommonModule,
			SharedModule,
			RouterModule.forChild(ERROR_500_ROUTE)
    ]
  
})
export class Error500Module { }
