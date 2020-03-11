import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChatNode } from 'app/shared/model/chat-node.model';

@Component({
  selector: 'jhi-chat-node-detail',
  templateUrl: './chat-node-detail.component.html'
})
export class ChatNodeDetailComponent implements OnInit {
  chatNode: IChatNode | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chatNode }) => {
      this.chatNode = chatNode;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
