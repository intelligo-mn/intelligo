import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsComponent } from './icons.component';
import { SharedModule } from '../../../shared/shared.module';


const ICONS_ROUTE = [
    { path: '', component: IconsComponent },
];

@NgModule({
	  declarations: [IconsComponent],
    imports: [
			CommonModule,
			SharedModule,
			RouterModule.forChild(ICONS_ROUTE)
    ]
  
})
export class IconsModule { }
