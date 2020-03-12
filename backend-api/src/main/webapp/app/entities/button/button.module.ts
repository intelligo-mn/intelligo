import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChatbotsmnSharedModule } from 'app/shared/shared.module';
import { ButtonComponent } from './button.component';
import { ButtonDetailComponent } from './button-detail.component';
import { ButtonUpdateComponent } from './button-update.component';
import { ButtonDeleteDialogComponent } from './button-delete-dialog.component';
import { buttonRoute } from './button.route';

@NgModule({
  imports: [ChatbotsmnSharedModule, RouterModule.forChild(buttonRoute)],
  declarations: [ButtonComponent, ButtonDetailComponent, ButtonUpdateComponent, ButtonDeleteDialogComponent],
  entryComponents: [ButtonDeleteDialogComponent]
})
export class ChatbotsmnButtonModule {}
