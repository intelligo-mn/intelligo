import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnimationsComponent } from './animations.component';
import { SharedModule } from '../../../shared/shared.module';


const ANIMATIONS_ROUTE = [
    { path: '', component: AnimationsComponent },
];

@NgModule({
	  declarations: [AnimationsComponent],
    imports: [
			CommonModule,
			SharedModule,
			RouterModule.forChild(ANIMATIONS_ROUTE)
    ]
  
})
export class AnimationsModule { }
