import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IChatFlow, ChatFlow } from 'app/shared/model/chat-flow.model';
import { ChatFlowService } from './chat-flow.service';
import { IChatNode } from 'app/shared/model/chat-node.model';
import { ChatNodeService } from 'app/entities/chat-node/chat-node.service';

@Component({
  selector: 'jhi-chat-flow-update',
  templateUrl: './chat-flow-update.component.html'
})
export class ChatFlowUpdateComponent implements OnInit {
  isSaving = false;

  chatnodes: IChatNode[] = [];

  editForm = this.fb.group({
    id: [],
    createdOn: [],
    updatedOn: [],
    nodeLocations: [],
    chatNodes: []
  });

  constructor(
    protected chatFlowService: ChatFlowService,
    protected chatNodeService: ChatNodeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chatFlow }) => {
      this.updateForm(chatFlow);

      this.chatNodeService
        .query()
        .pipe(
          map((res: HttpResponse<IChatNode[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IChatNode[]) => (this.chatnodes = resBody));
    });
  }

  updateForm(chatFlow: IChatFlow): void {
    this.editForm.patchValue({
      id: chatFlow.id,
      createdOn: chatFlow.createdOn,
      updatedOn: chatFlow.updatedOn,
      nodeLocations: chatFlow.nodeLocations,
      chatNodes: chatFlow.chatNodes
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chatFlow = this.createFromForm();
    if (chatFlow.id !== undefined) {
      this.subscribeToSaveResponse(this.chatFlowService.update(chatFlow));
    } else {
      this.subscribeToSaveResponse(this.chatFlowService.create(chatFlow));
    }
  }

  private createFromForm(): IChatFlow {
    return {
      ...new ChatFlow(),
      id: this.editForm.get(['id'])!.value,
      createdOn: this.editForm.get(['createdOn'])!.value,
      updatedOn: this.editForm.get(['updatedOn'])!.value,
      nodeLocations: this.editForm.get(['nodeLocations'])!.value,
      chatNodes: this.editForm.get(['chatNodes'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChatFlow>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IChatNode): any {
    return item.id;
  }
}
