import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolbarsComponent } from './toolbars.component';
import { SharedModule } from '../../../shared/shared.module';


const TOOLBARS_ROUTE = [
    { path: '', component: ToolbarsComponent },
];

@NgModule({
	  declarations: [ToolbarsComponent],
    imports: [
			CommonModule,
			SharedModule,
			RouterModule.forChild(TOOLBARS_ROUTE)
    ]
  
})
export class ToolbarsModule { }
