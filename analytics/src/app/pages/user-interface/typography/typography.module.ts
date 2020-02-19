import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TypographyComponent } from './typography.component';
import { SharedModule } from '../../../shared/shared.module';


const TYPOGRAPHY_ROUTE = [
    { path: '', component: TypographyComponent },
];

@NgModule({
	  declarations: [TypographyComponent],
    imports: [
			CommonModule,
			SharedModule,
			RouterModule.forChild(TYPOGRAPHY_ROUTE)
    ]
  
})
export class TypographyModule { }
