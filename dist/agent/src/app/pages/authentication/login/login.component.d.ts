import { OnInit } from "@angular/core";
import { DataService } from "../../../shared/services/data/data.service";
import { ConfigService } from "../../../shared/services/config/config.service";
import { InfoDialogService } from '../../../shared/services/helpers/info-dialog.service';
import { Router } from "@angular/router";
export declare class LoginComponent implements OnInit {
    router: Router;
    private config;
    private data;
    private infoDialog;
    username: string;
    password: string;
    socketEndpoint: string;
    apiGatewayEndpoint: string;
    constructor(router: Router, config: ConfigService, data: DataService, infoDialog: InfoDialogService);
    signIn(): void;
    ngOnInit(): void;
}
