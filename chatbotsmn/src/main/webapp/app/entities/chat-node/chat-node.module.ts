import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChatbotsmnSharedModule } from 'app/shared/shared.module';
import { ChatNodeComponent } from './chat-node.component';
import { ChatNodeDetailComponent } from './chat-node-detail.component';
import { ChatNodeUpdateComponent } from './chat-node-update.component';
import { ChatNodeDeleteDialogComponent } from './chat-node-delete-dialog.component';
import { chatNodeRoute } from './chat-node.route';

@NgModule({
  imports: [ChatbotsmnSharedModule, RouterModule.forChild(chatNodeRoute)],
  declarations: [ChatNodeComponent, ChatNodeDetailComponent, ChatNodeUpdateComponent, ChatNodeDeleteDialogComponent],
  entryComponents: [ChatNodeDeleteDialogComponent]
})
export class ChatbotsmnChatNodeModule {}
