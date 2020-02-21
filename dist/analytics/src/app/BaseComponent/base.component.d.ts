import { OnInit } from "@angular/core";
import { DataService } from "../shared/services/data/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material";
export declare class BaseComponent implements OnInit {
    private _data;
    private route;
    private router;
    private dialog;
    constructor(_data: DataService, route: ActivatedRoute, router: Router, dialog: MatDialog);
    ngOnInit(): void;
}
