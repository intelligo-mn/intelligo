import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Error404Component } from './404.component';
import { SharedModule } from '../../../shared/shared.module';


const ERROR_404_ROUTE = [
    { path: '', component: Error404Component },
];

@NgModule({
	  declarations: [Error404Component],
    imports: [
			CommonModule,
			SharedModule,
			RouterModule.forChild(ERROR_404_ROUTE)
    ]
  
})
export class Error404Module { }
