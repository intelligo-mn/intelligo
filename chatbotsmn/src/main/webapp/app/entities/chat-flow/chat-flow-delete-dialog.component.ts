import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChatFlow } from 'app/shared/model/chat-flow.model';
import { ChatFlowService } from './chat-flow.service';

@Component({
  templateUrl: './chat-flow-delete-dialog.component.html'
})
export class ChatFlowDeleteDialogComponent {
  chatFlow?: IChatFlow;

  constructor(protected chatFlowService: ChatFlowService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.chatFlowService.delete(id).subscribe(() => {
      this.eventManager.broadcast('chatFlowListModification');
      this.activeModal.close();
    });
  }
}
