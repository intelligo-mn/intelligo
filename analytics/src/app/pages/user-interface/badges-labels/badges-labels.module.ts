import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BadgesLabelsComponent } from './badges-labels.component';
import { SharedModule } from '../../../shared/shared.module';


const BADGES_LABELS_ROUTE = [
    { path: '', component: BadgesLabelsComponent },
];

@NgModule({
	  declarations: [BadgesLabelsComponent],
    imports: [
			CommonModule,
			SharedModule,
			RouterModule.forChild(BADGES_LABELS_ROUTE)
    ]
  
})
export class BadgesLabelsModule { }
