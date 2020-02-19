import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorsComponent } from './colors.component';
import { SharedModule } from '../../../shared/shared.module';


const COLORS_ROUTE = [
    { path: '', component: ColorsComponent },
];

@NgModule({
	  declarations: [ColorsComponent],
    imports: [
			CommonModule,
			SharedModule,
			RouterModule.forChild(COLORS_ROUTE)
    ]
  
})
export class ColorsModule { }
