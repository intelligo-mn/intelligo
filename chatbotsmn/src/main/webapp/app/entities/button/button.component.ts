import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IButton } from 'app/shared/model/button.model';
import { ButtonService } from './button.service';
import { ButtonDeleteDialogComponent } from './button-delete-dialog.component';

@Component({
  selector: 'jhi-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent implements OnInit, OnDestroy {
  buttons?: IButton[];
  eventSubscriber?: Subscription;

  constructor(protected buttonService: ButtonService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.buttonService.query().subscribe((res: HttpResponse<IButton[]>) => {
      this.buttons = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInButtons();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IButton): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInButtons(): void {
    this.eventSubscriber = this.eventManager.subscribe('buttonListModification', () => this.loadAll());
  }

  delete(button: IButton): void {
    const modalRef = this.modalService.open(ButtonDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.button = button;
  }
}
