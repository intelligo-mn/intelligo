import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChatFlow } from 'app/shared/model/chat-flow.model';

@Component({
  selector: 'jhi-chat-flow-detail',
  templateUrl: './chat-flow-detail.component.html'
})
export class ChatFlowDetailComponent implements OnInit {
  chatFlow: IChatFlow | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chatFlow }) => {
      this.chatFlow = chatFlow;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
