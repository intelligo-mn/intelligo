import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import {
  ChatBotReferance,
  ChatServerConnection,
} from "../../../models/app.models";
import { SettingsService } from "../../../services/settings.service";
import { ChatFlowService } from "../../../services/chatflow.service";
import { InfoDialogService } from "../../../services/info-dialog.service";
import { ChatServerManagerComponent } from "../chat-server-manager/chat-server-manager.component";
import * as models from "../../../models/chatflow.models";
import { DataService } from "../../../services/data.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private settings: SettingsService,
    private chatFlowService: ChatFlowService,
    private dialog: MatDialog,
    private infoDialog: InfoDialogService,
    private dataService: DataService,
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {
    this.dialogRef.disableClose = true;

    this.loadSavedConns();
    //this.dialogRef.afterClosed().subscribe(x => {
    //	if (!this.dataService.loggedInUser)
    //		this.router.navigateByUrl('/');
    //});
  }

  loadSavedConns() {
    this.savedConns = this.settings.loadSavedConnections();
    if (this.savedConns.length == 1) this.selectedServer = this.savedConns[0];
    else this.selectedServer = null;
  }

  savedConns: ChatServerConnection[] = [];
  selectedServer: ChatServerConnection;
  debugger;
  username: string;
  password: string;

  ngOnInit() {}

  dismiss() {
    this.dialogRef.close();
  }

  login() {
    this.dataService.loggedInUser = null;
    this.dataService.setConnection(this.selectedServer);
    this.infoDialog.showSpinner();
    this.dataService.login(this.username, this.password).subscribe(
      (x) => {
        this.infoDialog.hideSpinner();
        if (x.success) {
          this.dataService.loggedInUser = x.data;
          localStorage.setItem("user", JSON.stringify(x.data));
          this.dialogRef.close(true);
        } else
          this.dataService.handleTypedError(
            x.error,
            "Oops! Unable to login.",
            "Something went wrong while trying to login. Please try again."
          );
      },
      (err) => {
        this.infoDialog.hideSpinner();
        this.dataService.handleError(
          err,
          "Oops! Unable to login.",
          "Something went wrong while trying to login. Please try again."
        );
      }
    );
  }

  managePublishServers() {
    let dialogRef = this.dialog.open(ChatServerManagerComponent, {
      width: "60%",
    });

    dialogRef.afterClosed().subscribe((x) => {
      this.loadSavedConns();
    });
  }
}
