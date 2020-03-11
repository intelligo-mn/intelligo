import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IButton } from 'app/shared/model/button.model';
import { ButtonService } from './button.service';

@Component({
  templateUrl: './button-delete-dialog.component.html'
})
export class ButtonDeleteDialogComponent {
  button?: IButton;

  constructor(protected buttonService: ButtonService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.buttonService.delete(id).subscribe(() => {
      this.eventManager.broadcast('buttonListModification');
      this.activeModal.close();
    });
  }
}
