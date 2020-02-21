import { DataService } from "../../shared/services/data/data.service";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
export declare class GoalConversionComponent implements OnInit {
    private _data;
    startDateStr: any;
    endDateStr: any;
    chosenEndDate: Date;
    chosenStartDate: Date;
    showGraph: boolean;
    showDropdown: boolean;
    hideChart: boolean;
    loading: boolean;
    conversionPercentage: number;
    checkApi: boolean;
    goalNodeData: {};
    nameData: any[];
    goalNode: string;
    goalNodeDetails: any[];
    goalData: {};
    numberOfUsers: any[];
    numberOfUsersNew: any[];
    numberOfSessions: any[];
    numberOfViews: any[];
    numberOfClicks: any[];
    usersLabel: string;
    sessionsLabel: string;
    viewsLabel: string;
    clicksLabel: string;
    usersData: ({
        data: any[];
        label: string;
        type?: undefined;
        fill?: undefined;
    } | {
        data: any[];
        label: string;
        type: string;
        fill: boolean;
    })[];
    usersDataNew: ({
        data: any[];
        label: string;
        type?: undefined;
        fill?: undefined;
    } | {
        data: any[];
        label: string;
        type: string;
        fill: boolean;
    })[];
    goalNodeId: string[];
    trimNameUser: string[];
    trimNameSession: string[];
    trimNameView: string[];
    trimNameClick: string[];
    goalNodeName: string[];
    constructor(_data: DataService);
    getInitialDate(): void;
    getChosenDate(): void;
    drawWithLocalStorage(): void;
    ngOnInit(): void;
    refresh(): void;
    onClick(event: any): void;
    getAnalytics(): void;
    wrapText(str: string): string;
}
