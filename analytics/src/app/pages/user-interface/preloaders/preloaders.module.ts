import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PreloadersComponent } from './preloaders.component';
import { SharedModule } from '../../../shared/shared.module';


const PRELOADERS_ROUTE = [
    { path: '', component: PreloadersComponent },
];

@NgModule({
	  declarations: [PreloadersComponent],
    imports: [
			CommonModule,
			SharedModule,
			RouterModule.forChild(PRELOADERS_ROUTE)
    ]
  
})
export class PreloadersModule { }
