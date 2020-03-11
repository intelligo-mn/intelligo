import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChatNode } from 'app/shared/model/chat-node.model';
import { ChatNodeService } from './chat-node.service';

@Component({
  templateUrl: './chat-node-delete-dialog.component.html'
})
export class ChatNodeDeleteDialogComponent {
  chatNode?: IChatNode;

  constructor(protected chatNodeService: ChatNodeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.chatNodeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('chatNodeListModification');
      this.activeModal.close();
    });
  }
}
