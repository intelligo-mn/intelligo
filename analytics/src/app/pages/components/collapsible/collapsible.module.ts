import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CollapsibleComponent } from './collapsible.component';
import { SharedModule } from '../../../shared/shared.module';


const COLLAPSIBLE_ROUTE = [
    { path: '', component: CollapsibleComponent },
];

@NgModule({
	  declarations: [CollapsibleComponent],
    imports: [
			CommonModule,
			SharedModule,
			RouterModule.forChild(COLLAPSIBLE_ROUTE)
    ]
  
})
export class CollapsibleModule { }
