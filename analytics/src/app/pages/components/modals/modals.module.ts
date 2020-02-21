import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalsComponent } from './modals.component';
import { SharedModule } from '../../../shared/shared.module';


const MODALS_ROUTE = [
    { path: '', component: ModalsComponent },
];

@NgModule({
	  declarations: [ModalsComponent],
    imports: [
			CommonModule,
			SharedModule,
			RouterModule.forChild(MODALS_ROUTE)
    ]
  
})
export class ModalsModule { }
