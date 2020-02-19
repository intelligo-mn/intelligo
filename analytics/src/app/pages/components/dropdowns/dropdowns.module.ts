import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropdownsComponent } from './dropdowns.component';
import { SharedModule } from '../../../shared/shared.module';


const DROPDOWNS_ROUTE = [
    { path: '', component: DropdownsComponent },
];

@NgModule({
	  declarations: [DropdownsComponent],
    imports: [
			CommonModule,
			SharedModule,
			RouterModule.forChild(DROPDOWNS_ROUTE)
    ]
  
})
export class DropdownsModule { }
