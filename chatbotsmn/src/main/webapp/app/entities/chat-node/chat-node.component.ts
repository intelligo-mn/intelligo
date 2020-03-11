import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IChatNode } from 'app/shared/model/chat-node.model';
import { ChatNodeService } from './chat-node.service';
import { ChatNodeDeleteDialogComponent } from './chat-node-delete-dialog.component';

@Component({
  selector: 'jhi-chat-node',
  templateUrl: './chat-node.component.html'
})
export class ChatNodeComponent implements OnInit, OnDestroy {
  chatNodes?: IChatNode[];
  eventSubscriber?: Subscription;

  constructor(protected chatNodeService: ChatNodeService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.chatNodeService.query().subscribe((res: HttpResponse<IChatNode[]>) => {
      this.chatNodes = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInChatNodes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IChatNode): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInChatNodes(): void {
    this.eventSubscriber = this.eventManager.subscribe('chatNodeListModification', () => this.loadAll());
  }

  delete(chatNode: IChatNode): void {
    const modalRef = this.modalService.open(ChatNodeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.chatNode = chatNode;
  }
}
