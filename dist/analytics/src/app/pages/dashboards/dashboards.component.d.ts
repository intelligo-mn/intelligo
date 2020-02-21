import { OnInit } from "@angular/core";
import { DataService } from "../../shared/services/data/data.service";
export declare class DashboardsComponent implements OnInit {
    private _data;
    node: boolean;
    loading: boolean;
    errorMsg1: boolean;
    active: boolean;
    data: any;
    nodeChannels: any[];
    activeChannels: any[];
    constructor(_data: DataService);
    ngOnInit(): void;
    refresh(): void;
    checkForChannels(data: any): void;
    apiCall(): void;
}
