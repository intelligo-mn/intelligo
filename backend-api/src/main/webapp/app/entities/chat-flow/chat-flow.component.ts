import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IChatFlow } from 'app/shared/model/chat-flow.model';
import { ChatFlowService } from './chat-flow.service';
import { ChatFlowDeleteDialogComponent } from './chat-flow-delete-dialog.component';

@Component({
  selector: 'jhi-chat-flow',
  templateUrl: './chat-flow.component.html'
})
export class ChatFlowComponent implements OnInit, OnDestroy {
  chatFlows?: IChatFlow[];
  eventSubscriber?: Subscription;

  constructor(protected chatFlowService: ChatFlowService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.chatFlowService.query().subscribe((res: HttpResponse<IChatFlow[]>) => {
      this.chatFlows = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInChatFlows();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IChatFlow): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInChatFlows(): void {
    this.eventSubscriber = this.eventManager.subscribe('chatFlowListModification', () => this.loadAll());
  }

  delete(chatFlow: IChatFlow): void {
    const modalRef = this.modalService.open(ChatFlowDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.chatFlow = chatFlow;
  }
}
