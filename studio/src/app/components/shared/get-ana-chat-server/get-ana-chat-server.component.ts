import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnaCloudSignupComponent } from '../ana-cloud-signup/ana-cloud-signup.component';
@Component({
  selector: 'app-get-intelligo-chat-server',
  templateUrl: './get-intelligo-chat-server.component.html',
  styleUrls: ['./get-intelligo-chat-server.component.scss'],
})
export class GetAnaChatServerComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  selfHost() {
    window.location.href = 'https://www.chatbots.mn/self-hosting';
  }

  anaCloud() {
    let d = this.dialog.open(AnaCloudSignupComponent, {
      width: 'auto',
    });
  }
}
