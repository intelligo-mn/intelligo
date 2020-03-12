import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IButton, Button } from 'app/shared/model/button.model';
import { ButtonService } from './button.service';
import { IChatNode } from 'app/shared/model/chat-node.model';
import { ChatNodeService } from 'app/entities/chat-node/chat-node.service';

@Component({
  selector: 'jhi-button-update',
  templateUrl: './button-update.component.html'
})
export class ButtonUpdateComponent implements OnInit {
  isSaving = false;

  chatnodes: IChatNode[] = [];

  editForm = this.fb.group({
    id: [],
    buttonName: [],
    buttonText: [],
    emotion: [],
    buttonType: [],
    deepLinkUrl: [],
    url: [],
    itemsSource: [],
    allowMultiple: [],
    bounceTimeout: [],
    nextNodeId: [],
    defaultButton: [],
    hidden: [],
    variableValue: [],
    prefixText: [],
    postfixText: [],
    placeholderText: [],
    conditionMatchKey: [],
    conditionOperator: [],
    conditionMatchValue: [],
    postToChat: [],
    doesRepeat: [],
    repeatOn: [],
    repeatAs: [],
    startPosition: [],
    maxRepeats: [],
    advancedOptions: [],
    minLength: [],
    maxLength: [],
    defaultText: [],
    isMultiLine: [],
    contentId: [],
    contentEmotion: [],
    chatNode: []
  });

  constructor(
    protected buttonService: ButtonService,
    protected chatNodeService: ChatNodeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ button }) => {
      this.updateForm(button);

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

  updateForm(button: IButton): void {
    this.editForm.patchValue({
      id: button.id,
      buttonName: button.buttonName,
      buttonText: button.buttonText,
      emotion: button.emotion,
      buttonType: button.buttonType,
      deepLinkUrl: button.deepLinkUrl,
      url: button.url,
      itemsSource: button.itemsSource,
      allowMultiple: button.allowMultiple,
      bounceTimeout: button.bounceTimeout,
      nextNodeId: button.nextNodeId,
      defaultButton: button.defaultButton,
      hidden: button.hidden,
      variableValue: button.variableValue,
      prefixText: button.prefixText,
      postfixText: button.postfixText,
      placeholderText: button.placeholderText,
      conditionMatchKey: button.conditionMatchKey,
      conditionOperator: button.conditionOperator,
      conditionMatchValue: button.conditionMatchValue,
      postToChat: button.postToChat,
      doesRepeat: button.doesRepeat,
      repeatOn: button.repeatOn,
      repeatAs: button.repeatAs,
      startPosition: button.startPosition,
      maxRepeats: button.maxRepeats,
      advancedOptions: button.advancedOptions,
      minLength: button.minLength,
      maxLength: button.maxLength,
      defaultText: button.defaultText,
      isMultiLine: button.isMultiLine,
      contentId: button.contentId,
      contentEmotion: button.contentEmotion,
      chatNode: button.chatNode
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const button = this.createFromForm();
    if (button.id !== undefined) {
      this.subscribeToSaveResponse(this.buttonService.update(button));
    } else {
      this.subscribeToSaveResponse(this.buttonService.create(button));
    }
  }

  private createFromForm(): IButton {
    return {
      ...new Button(),
      id: this.editForm.get(['id'])!.value,
      buttonName: this.editForm.get(['buttonName'])!.value,
      buttonText: this.editForm.get(['buttonText'])!.value,
      emotion: this.editForm.get(['emotion'])!.value,
      buttonType: this.editForm.get(['buttonType'])!.value,
      deepLinkUrl: this.editForm.get(['deepLinkUrl'])!.value,
      url: this.editForm.get(['url'])!.value,
      itemsSource: this.editForm.get(['itemsSource'])!.value,
      allowMultiple: this.editForm.get(['allowMultiple'])!.value,
      bounceTimeout: this.editForm.get(['bounceTimeout'])!.value,
      nextNodeId: this.editForm.get(['nextNodeId'])!.value,
      defaultButton: this.editForm.get(['defaultButton'])!.value,
      hidden: this.editForm.get(['hidden'])!.value,
      variableValue: this.editForm.get(['variableValue'])!.value,
      prefixText: this.editForm.get(['prefixText'])!.value,
      postfixText: this.editForm.get(['postfixText'])!.value,
      placeholderText: this.editForm.get(['placeholderText'])!.value,
      conditionMatchKey: this.editForm.get(['conditionMatchKey'])!.value,
      conditionOperator: this.editForm.get(['conditionOperator'])!.value,
      conditionMatchValue: this.editForm.get(['conditionMatchValue'])!.value,
      postToChat: this.editForm.get(['postToChat'])!.value,
      doesRepeat: this.editForm.get(['doesRepeat'])!.value,
      repeatOn: this.editForm.get(['repeatOn'])!.value,
      repeatAs: this.editForm.get(['repeatAs'])!.value,
      startPosition: this.editForm.get(['startPosition'])!.value,
      maxRepeats: this.editForm.get(['maxRepeats'])!.value,
      advancedOptions: this.editForm.get(['advancedOptions'])!.value,
      minLength: this.editForm.get(['minLength'])!.value,
      maxLength: this.editForm.get(['maxLength'])!.value,
      defaultText: this.editForm.get(['defaultText'])!.value,
      isMultiLine: this.editForm.get(['isMultiLine'])!.value,
      contentId: this.editForm.get(['contentId'])!.value,
      contentEmotion: this.editForm.get(['contentEmotion'])!.value,
      chatNode: this.editForm.get(['chatNode'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IButton>>): void {
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
