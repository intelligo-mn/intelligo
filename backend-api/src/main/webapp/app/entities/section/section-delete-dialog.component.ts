import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISection } from 'app/shared/model/section.model';
import { SectionService } from './section.service';

@Component({
  templateUrl: './section-delete-dialog.component.html'
})
export class SectionDeleteDialogComponent {
  section?: ISection;

  constructor(protected sectionService: SectionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sectionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('sectionListModification');
      this.activeModal.close();
    });
  }
}
