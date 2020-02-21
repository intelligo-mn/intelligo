import { OnInit } from "@angular/core";
import { DataService } from "../../shared/services/data/data.service";
export declare class AgentAnalyticsComponent implements OnInit {
    private _data;
    errorMsg: boolean;
    apiData: any[];
    hideChart1: boolean;
    hideChart2: boolean;
    xlabel: string;
    ylabel: string;
    chatSessionData: any[];
    agentNames: any[];
    loading: boolean;
    loading1: boolean;
    dates: any[];
    dataLoading: boolean;
    numberOfChatSessions: any[];
    chatSessionsData: {
        data: any[];
        label: string;
        backgroundColor: string;
    }[];
    agentData: {
        data: any[];
        label: string;
        backgroundColor: string;
    }[];
    constructor(_data: DataService);
    ngOnInit(): void;
    chatSessionsApiCall(): void;
    agentDataApiCall(): void;
    refresh1(): void;
    refresh2(): void;
}
