import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChatProject } from 'app/shared/model/chat-project.model';
import { ChatProjectService } from './chat-project.service';

@Component({
  templateUrl: './chat-project-delete-dialog.component.html'
})
export class ChatProjectDeleteDialogComponent {
  chatProject?: IChatProject;

  constructor(
    protected chatProjectService: ChatProjectService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.chatProjectService.delete(id).subscribe(() => {
      this.eventManager.broadcast('chatProjectListModification');
      this.activeModal.close();
    });
  }
}
