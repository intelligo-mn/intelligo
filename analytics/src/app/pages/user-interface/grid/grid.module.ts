import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GridComponent } from './grid.component';
import { SharedModule } from '../../../shared/shared.module';


const GRID_ROUTE = [
    { path: '', component: GridComponent },
];

@NgModule({
	  declarations: [GridComponent],
    imports: [
			CommonModule,
			SharedModule,
			RouterModule.forChild(GRID_ROUTE)
    ]
  
})
export class GridModule { }
