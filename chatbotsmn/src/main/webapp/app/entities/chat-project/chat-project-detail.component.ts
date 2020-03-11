import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChatProject } from 'app/shared/model/chat-project.model';

@Component({
  selector: 'jhi-chat-project-detail',
  templateUrl: './chat-project-detail.component.html'
})
export class ChatProjectDetailComponent implements OnInit {
  chatProject: IChatProject | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chatProject }) => {
      this.chatProject = chatProject;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
