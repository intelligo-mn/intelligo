import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IChatProject, ChatProject } from 'app/shared/model/chat-project.model';
import { ChatProjectService } from './chat-project.service';
import { IChatFlow } from 'app/shared/model/chat-flow.model';
import { ChatFlowService } from 'app/entities/chat-flow/chat-flow.service';

@Component({
  selector: 'jhi-chat-project-update',
  templateUrl: './chat-project-update.component.html'
})
export class ChatProjectUpdateComponent implements OnInit {
  isSaving = false;

  flows: IChatFlow[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    status: [],
    userId: [null, [Validators.required]],
    flow: []
  });

  constructor(
    protected chatProjectService: ChatProjectService,
    protected chatFlowService: ChatFlowService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chatProject }) => {
      this.updateForm(chatProject);

      this.chatFlowService
        .query({ filter: 'chatproject-is-null' })
        .pipe(
          map((res: HttpResponse<IChatFlow[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IChatFlow[]) => {
          if (!chatProject.flow || !chatProject.flow.id) {
            this.flows = resBody;
          } else {
            this.chatFlowService
              .find(chatProject.flow.id)
              .pipe(
                map((subRes: HttpResponse<IChatFlow>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IChatFlow[]) => {
                this.flows = concatRes;
              });
          }
        });
    });
  }

  updateForm(chatProject: IChatProject): void {
    this.editForm.patchValue({
      id: chatProject.id,
      name: chatProject.name,
      status: chatProject.status,
      userId: chatProject.userId,
      flow: chatProject.flow
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chatProject = this.createFromForm();
    if (chatProject.id !== undefined) {
      this.subscribeToSaveResponse(this.chatProjectService.update(chatProject));
    } else {
      this.subscribeToSaveResponse(this.chatProjectService.create(chatProject));
    }
  }

  private createFromForm(): IChatProject {
    return {
      ...new ChatProject(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      status: this.editForm.get(['status'])!.value,
      userId: this.editForm.get(['userId'])!.value,
      flow: this.editForm.get(['flow'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChatProject>>): void {
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
