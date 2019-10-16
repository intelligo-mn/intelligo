import { OnInit, AfterViewInit } from '@angular/core';
import { MatDialogRef, MatDatepicker } from '@angular/material';
import { ANADate, ANATime, AddressInput, GeoLoc, ListItem, ANADateRange } from '../../models/ana-chat.models';
import * as agm from '@agm/core';
export declare class ComplexInputComponent implements OnInit, AfterViewInit {
    dialogRef: MatDialogRef<ComplexInputComponent>;
    params: ComplexInputParams;
    constructor(dialogRef: MatDialogRef<ComplexInputComponent>, params: ComplexInputParams);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ComplexType: typeof ComplexType;
    choosenTime: string;
    getChoosenANATime(): ANATime;
    datePicker: MatDatepicker<Date>;
    choosenDate: Date;
    getChoosenANADate(): ANADate;
    givenAddress: AddressInput;
    geoLoc: GeoLoc;
    mapLocationUpdated(event: agm.MouseEvent): void;
    selectedListItem: ListItem;
    listValues: ListItem[];
    listMultiple: boolean;
    choosenListValues(): ListItem[];
    listItemsSearch: string;
    searchedListValues(): ListItem[];
    isValid(): boolean;
    dialogClose(): void;
}
export declare enum ComplexType {
    Date = 0,
    Time = 1,
    Location = 2,
    Address = 3,
    List = 4
}
export interface ComplexInputParams {
    Type: ComplexType;
    DefaultGeoLoc?: GeoLoc;
    ListValues?: ListItem[];
    ListMultiple?: boolean;
    AddressRequiredFields?: string[];
    dateRange?: ANADateRange;
}
