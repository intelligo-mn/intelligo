import { OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
export declare class AngularSectionComponent implements OnInit {
    private modalService;
    fromDate: NgbDate;
    toDate: NgbDate;
    hoveredDate: NgbDate;
    closeResult: string;
    model1: NgbDate;
    model2: NgbDate;
    focus: any;
    focus1: any;
    focus2: any;
    focus3: any;
    focus4: any;
    constructor(modalService: NgbModal, calendar: NgbCalendar);
    open(content: any, type: any, modalDimension: any): void;
    private getDismissReason;
    isRangeStart(date: NgbDate): boolean;
    isRangeEnd(date: NgbDate): boolean;
    isInRange(date: NgbDate): boolean;
    isActive(date: NgbDate): boolean;
    endDateChanged(date: any): void;
    startDateChanged(date: any): void;
    ngOnInit(): void;
}
