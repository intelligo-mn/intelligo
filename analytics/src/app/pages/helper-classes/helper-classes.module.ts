import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HelperClassesComponent } from './helper-classes.component';
import { SharedModule } from '../../shared/shared.module';


const HELPER_CLASSES_ROUTE = [
    { path: '', component: HelperClassesComponent },
];

@NgModule({
	  declarations: [HelperClassesComponent],
    imports: [
			CommonModule,
			SharedModule,
			RouterModule.forChild(HELPER_CLASSES_ROUTE)
    ]
  
})
export class HelperClassesModule { }
