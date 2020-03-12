import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IChatFlow, ChatFlow } from 'app/shared/model/chat-flow.model';
import { ChatFlowService } from './chat-flow.service';

@Component({
  selector: 'jhi-chat-flow-update',
  templateUrl: './chat-flow-update.component.html'
})
export class ChatFlowUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    createdOn: [],
    updatedOn: [],
    nodeLocations: []
  });

  constructor(protected chatFlowService: ChatFlowService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chatFlow }) => {
      this.updateForm(chatFlow);
    });
  }

  updateForm(chatFlow: IChatFlow): void {
    this.editForm.patchValue({
      id: chatFlow.id,
      createdOn: chatFlow.createdOn,
      updatedOn: chatFlow.updatedOn,
      nodeLocations: chatFlow.nodeLocations
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
      nodeLocations: this.editForm.get(['nodeLocations'])!.value
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
}
