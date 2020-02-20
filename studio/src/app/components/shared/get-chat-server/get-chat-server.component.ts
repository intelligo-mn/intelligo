import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CloudSignupComponent } from '../cloud-signup/cloud-signup.component';
@Component({
  selector: 'app-get-chat-server',
  templateUrl: './get-chat-server.component.html',
  styleUrls: ['./get-chat-server.component.scss'],
})
export class GetChatServerComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  selfHost() {
    window.location.href = 'https://www.chatbots.mn/self-hosting';
  }

  anaCloud() {
    let d = this.dialog.open(CloudSignupComponent, {
      width: 'auto',
    });
  }
}
