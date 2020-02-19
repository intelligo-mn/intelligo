import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationsDialogsComponent } from './notifications-dialogs.component';
import { SharedModule } from '../../../shared/shared.module';


const NOTIFICATIONS_DIALOGS_ROUTE = [
    { path: '', component: NotificationsDialogsComponent },
];

@NgModule({
	  declarations: [NotificationsDialogsComponent],
    imports: [
			CommonModule,
			SharedModule,
			RouterModule.forChild(NOTIFICATIONS_DIALOGS_ROUTE)
    ]
  
})
export class NotificationsDialogsModule { }
