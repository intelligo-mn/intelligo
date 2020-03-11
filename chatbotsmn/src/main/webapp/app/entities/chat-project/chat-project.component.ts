import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IChatProject } from 'app/shared/model/chat-project.model';
import { ChatProjectService } from './chat-project.service';
import { ChatProjectDeleteDialogComponent } from './chat-project-delete-dialog.component';

@Component({
  selector: 'jhi-chat-project',
  templateUrl: './chat-project.component.html'
})
export class ChatProjectComponent implements OnInit, OnDestroy {
  chatProjects?: IChatProject[];
  eventSubscriber?: Subscription;

  constructor(
    protected chatProjectService: ChatProjectService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.chatProjectService.query().subscribe((res: HttpResponse<IChatProject[]>) => {
      this.chatProjects = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInChatProjects();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IChatProject): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInChatProjects(): void {
    this.eventSubscriber = this.eventManager.subscribe('chatProjectListModification', () => this.loadAll());
  }

  delete(chatProject: IChatProject): void {
    const modalRef = this.modalService.open(ChatProjectDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.chatProject = chatProject;
  }
}
