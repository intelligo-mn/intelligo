import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChatbotsmnSharedModule } from 'app/shared/shared.module';
import { ChatProjectComponent } from './chat-project.component';
import { ChatProjectDetailComponent } from './chat-project-detail.component';
import { ChatProjectUpdateComponent } from './chat-project-update.component';
import { ChatProjectDeleteDialogComponent } from './chat-project-delete-dialog.component';
import { chatProjectRoute } from './chat-project.route';

@NgModule({
  imports: [ChatbotsmnSharedModule, RouterModule.forChild(chatProjectRoute)],
  declarations: [ChatProjectComponent, ChatProjectDetailComponent, ChatProjectUpdateComponent, ChatProjectDeleteDialogComponent],
  entryComponents: [ChatProjectDeleteDialogComponent]
})
export class ChatbotsmnChatProjectModule {}
