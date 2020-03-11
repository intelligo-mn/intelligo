import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IChatNode, ChatNode } from 'app/shared/model/chat-node.model';
import { ChatNodeService } from './chat-node.service';
import { IChatFlow } from 'app/shared/model/chat-flow.model';
import { ChatFlowService } from 'app/entities/chat-flow/chat-flow.service';

@Component({
  selector: 'jhi-chat-node-update',
  templateUrl: './chat-node-update.component.html'
})
export class ChatNodeUpdateComponent implements OnInit {
  isSaving = false;

  chatflows: IChatFlow[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    emotion: [],
    chatNodeType: [],
    variableName: [],
    apiMethod: [],
    apiUrl: [],
    apiResponseDataRoot: [],
    nextNodeId: [],
    requiredVariables: [],
    groupName: [],
    cardHeader: [],
    cardFooter: [],
    isStartNode: [],
    isGoalNode: [],
    targetBotId: [],
    targetNodeId: [],
    chatFlow: []
  });

  constructor(
    protected chatNodeService: ChatNodeService,
    protected chatFlowService: ChatFlowService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chatNode }) => {
      this.updateForm(chatNode);

      this.chatFlowService
        .query()
        .pipe(
          map((res: HttpResponse<IChatFlow[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IChatFlow[]) => (this.chatflows = resBody));
    });
  }

  updateForm(chatNode: IChatNode): void {
    this.editForm.patchValue({
      id: chatNode.id,
      name: chatNode.name,
      emotion: chatNode.emotion,
      chatNodeType: chatNode.chatNodeType,
      variableName: chatNode.variableName,
      apiMethod: chatNode.apiMethod,
      apiUrl: chatNode.apiUrl,
      apiResponseDataRoot: chatNode.apiResponseDataRoot,
      nextNodeId: chatNode.nextNodeId,
      requiredVariables: chatNode.requiredVariables,
      groupName: chatNode.groupName,
      cardHeader: chatNode.cardHeader,
      cardFooter: chatNode.cardFooter,
      isStartNode: chatNode.isStartNode,
      isGoalNode: chatNode.isGoalNode,
      targetBotId: chatNode.targetBotId,
      targetNodeId: chatNode.targetNodeId,
      chatFlow: chatNode.chatFlow
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chatNode = this.createFromForm();
    if (chatNode.id !== undefined) {
      this.subscribeToSaveResponse(this.chatNodeService.update(chatNode));
    } else {
      this.subscribeToSaveResponse(this.chatNodeService.create(chatNode));
    }
  }

  private createFromForm(): IChatNode {
    return {
      ...new ChatNode(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      emotion: this.editForm.get(['emotion'])!.value,
      chatNodeType: this.editForm.get(['chatNodeType'])!.value,
      variableName: this.editForm.get(['variableName'])!.value,
      apiMethod: this.editForm.get(['apiMethod'])!.value,
      apiUrl: this.editForm.get(['apiUrl'])!.value,
      apiResponseDataRoot: this.editForm.get(['apiResponseDataRoot'])!.value,
      nextNodeId: this.editForm.get(['nextNodeId'])!.value,
      requiredVariables: this.editForm.get(['requiredVariables'])!.value,
      groupName: this.editForm.get(['groupName'])!.value,
      cardHeader: this.editForm.get(['cardHeader'])!.value,
      cardFooter: this.editForm.get(['cardFooter'])!.value,
      isStartNode: this.editForm.get(['isStartNode'])!.value,
      isGoalNode: this.editForm.get(['isGoalNode'])!.value,
      targetBotId: this.editForm.get(['targetBotId'])!.value,
      targetNodeId: this.editForm.get(['targetNodeId'])!.value,
      chatFlow: this.editForm.get(['chatFlow'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChatNode>>): void {
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

  trackById(index: number, item: IChatFlow): any {
    return item.id;
  }
}
