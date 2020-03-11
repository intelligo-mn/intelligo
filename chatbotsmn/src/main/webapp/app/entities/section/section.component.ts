import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISection } from 'app/shared/model/section.model';
import { SectionService } from './section.service';
import { SectionDeleteDialogComponent } from './section-delete-dialog.component';

@Component({
  selector: 'jhi-section',
  templateUrl: './section.component.html'
})
export class SectionComponent implements OnInit, OnDestroy {
  sections?: ISection[];
  eventSubscriber?: Subscription;

  constructor(protected sectionService: SectionService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.sectionService.query().subscribe((res: HttpResponse<ISection[]>) => {
      this.sections = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSections();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISection): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSections(): void {
    this.eventSubscriber = this.eventManager.subscribe('sectionListModification', () => this.loadAll());
  }

  delete(section: ISection): void {
    const modalRef = this.modalService.open(SectionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.section = section;
  }
}
