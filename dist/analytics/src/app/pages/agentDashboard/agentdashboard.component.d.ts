import { OnInit } from "@angular/core";
import { DataService } from "../../shared/services/data/data.service";
export declare class AgentDashboardComponent implements OnInit {
    private _data;
    loading: boolean;
    errorMsg: boolean;
    dataLoading: boolean;
    activeChatDetails: {};
    activeStats: {};
    constructor(_data: DataService);
    ngOnInit(): void;
    refresh(): void;
}
