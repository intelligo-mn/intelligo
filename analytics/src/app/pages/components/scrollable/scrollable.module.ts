import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollableComponent } from './scrollable.component';
import { SharedModule } from '../../../shared/shared.module';


const SCROLLABLE_ROUTE = [
    { path: '', component: ScrollableComponent },
];

@NgModule({
	  declarations: [ScrollableComponent],
    imports: [
			CommonModule,
			SharedModule,
			RouterModule.forChild(SCROLLABLE_ROUTE)
    ]
  
})
export class ScrollableModule { }
