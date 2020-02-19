import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsPillsComponent } from './tabs-pills.component';
import { SharedModule } from '../../../shared/shared.module';


const TABS_PILLS_ROUTE = [
    { path: '', component: TabsPillsComponent },
];

@NgModule({
	  declarations: [TabsPillsComponent],
    imports: [
			CommonModule,
			SharedModule,
			RouterModule.forChild(TABS_PILLS_ROUTE)
    ]
  
})
export class TabsPillsModule { }
