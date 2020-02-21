import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidersProgressbarsComponent } from './sliders-progressbars.component';
import { SharedModule } from '../../../shared/shared.module';


const SLIDERS_PROGRESSBARS_ROUTE = [
    { path: '', component: SlidersProgressbarsComponent },
];

@NgModule({
	  declarations: [SlidersProgressbarsComponent],
    imports: [
			CommonModule,
			SharedModule,
			RouterModule.forChild(SLIDERS_PROGRESSBARS_ROUTE)
    ]
  
})
export class SlidersProgressbarsModule { }
