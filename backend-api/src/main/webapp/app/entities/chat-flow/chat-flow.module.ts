import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChatbotsmnSharedModule } from 'app/shared/shared.module';
import { ChatFlowComponent } from './chat-flow.component';
import { ChatFlowDetailComponent } from './chat-flow-detail.component';
import { ChatFlowUpdateComponent } from './chat-flow-update.component';
import { ChatFlowDeleteDialogComponent } from './chat-flow-delete-dialog.component';
import { chatFlowRoute } from './chat-flow.route';

@NgModule({
  imports: [ChatbotsmnSharedModule, RouterModule.forChild(chatFlowRoute)],
  declarations: [ChatFlowComponent, ChatFlowDetailComponent, ChatFlowUpdateComponent, ChatFlowDeleteDialogComponent],
  entryComponents: [ChatFlowDeleteDialogComponent]
})
export class ChatbotsmnChatFlowModule {}
