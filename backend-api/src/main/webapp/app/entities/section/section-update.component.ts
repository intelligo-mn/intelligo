import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ISection, Section } from 'app/shared/model/section.model';
import { SectionService } from './section.service';
import { IChatNode } from 'app/shared/model/chat-node.model';
import { ChatNodeService } from 'app/entities/chat-node/chat-node.service';

@Component({
  selector: 'jhi-section-update',
  templateUrl: './section-update.component.html'
})
export class SectionUpdateComponent implements OnInit {
  isSaving = false;

  chatnodes: IChatNode[] = [];

  editForm = this.fb.group({
    id: [],
    sectionType: [],
    delayInMs: [],
    hidden: [],
    contentId: [],
    contentEmotion: [],
    chatNode: []
  });

  constructor(
    protected sectionService: SectionService,
    protected chatNodeService: ChatNodeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ section }) => {
      this.updateForm(section);

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

  updateForm(section: ISection): void {
    this.editForm.patchValue({
      id: section.id,
      sectionType: section.sectionType,
      delayInMs: section.delayInMs,
      hidden: section.hidden,
      contentId: section.contentId,
      contentEmotion: section.contentEmotion,
      chatNode: section.chatNode
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const section = this.createFromForm();
    if (section.id !== undefined) {
      this.subscribeToSaveResponse(this.sectionService.update(section));
    } else {
      this.subscribeToSaveResponse(this.sectionService.create(section));
    }
  }

  private createFromForm(): ISection {
    return {
      ...new Section(),
      id: this.editForm.get(['id'])!.value,
      sectionType: this.editForm.get(['sectionType'])!.value,
      delayInMs: this.editForm.get(['delayInMs'])!.value,
      hidden: this.editForm.get(['hidden'])!.value,
      contentId: this.editForm.get(['contentId'])!.value,
      contentEmotion: this.editForm.get(['contentEmotion'])!.value,
      chatNode: this.editForm.get(['chatNode'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISection>>): void {
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
