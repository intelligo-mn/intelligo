import { Http } from "@angular/http";
import "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";
export declare class DataService {
    private http;
    apiBase: string;
    businessId: string;
    businessName: string;
    chatFlowId: string;
    constructor(http: Http);
    getDetails(): any;
    getDetailsNew(startDate?: string, endDate?: string): any;
    getGoalNodeDetails(): any;
    getGoalNodeData(goalNode: string, startDate?: string, endDate?: string): any;
    getActiveUsersAndAgents(): any;
    getStatsForChatSession(): any;
    getNumberOfUsersAndChatSessions(): any;
    getNumberOfChatSessions(): any;
    getUsersData(startDate?: string, endDate?: string): any;
    getBehaviourFlow(startDate?: string, endDate?: string): any;
}
export interface UserDataItem {
    slNo: number;
    date: string;
    channel: string;
    timeSpent: number;
    timeSpan: string;
    noOfInteractions: number;
    variableData: {
        [key: string]: string;
    };
}
