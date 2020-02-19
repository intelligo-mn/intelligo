import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LockComponent } from './lock.component';
import { SharedModule } from '../../../shared/shared.module';


const LOCK_ROUTE = [
    { path: '', component: LockComponent },
];

@NgModule({
	  declarations: [LockComponent],
    imports: [
			CommonModule,
			SharedModule,
			RouterModule.forChild(LOCK_ROUTE)
    ]
  
})
export class LockModule { }
