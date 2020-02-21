import { DataService, UserDataItem } from "../../shared/services/data/data.service";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
export declare class LeadsComponent implements OnInit {
    private _data;
    startDateStr: string;
    endDateStr: string;
    excelData: any;
    EXCEL_TYPE: string;
    EXCEL_EXTENSION: string;
    errorMsg: boolean;
    rows: TableRow[];
    exportData: any[];
    temp: any[];
    userData: UserDataItem[];
    isSelected: boolean;
    Loading: boolean;
    varData: {};
    slno: number;
    displayData: any[];
    chosenStartDate: Date;
    chosenEndDate: Date;
    channels: any[];
    columns: {
        name: string;
        prop: string;
    }[];
    constructor(_data: DataService);
    getVarData(slno: number): {
        [key: string]: string;
    };
    reloadTableData(): void;
    getInitialDate(): void;
    getChosenDate(): void;
    ngOnInit(): void;
    selected: any;
    onSelect(event: any): void;
    onClick(event: any): void;
    checkedItem: {
        [key: string]: boolean;
    };
    onCheckChanged(event: any): void;
    filteredRecords: any[];
    filterRecords(): any[];
    exportDataAsExcel(): void;
    exportAsExcelFile(json: any[], excelFileName: string): void;
    private saveAsExcelFile;
}
export interface TableRow {
    slNo: number;
    date: string;
    channel: string;
    timeSpent: number;
    timeSpan: string;
    noOfInteractions: number;
}
