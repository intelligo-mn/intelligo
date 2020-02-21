import { EventEmitter, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
export declare class ModalsComponent implements OnInit {
    private modalService;
    title: string;
    hidden: boolean;
    isValid: boolean;
    showNext: boolean;
    showPrev: boolean;
    onNext: EventEmitter<any>;
    onPrev: EventEmitter<any>;
    language: string[];
    myform: FormGroup;
    private _isActive;
    isDisabled: boolean;
    closeResult: string;
    scrollbarOptions: {
        axis: string;
        theme: string;
    };
    constructor(modalService: NgbModal);
    isActive: boolean;
    isCompleted: boolean;
    onStep1Next(event: any): void;
    onStep2Next(event: any): void;
    onStep3Next(event: any): void;
    onComplete(event: any): void;
    onStepChanged(step: any): void;
    ngOnInit(): void;
    openFullscreen(fullscreen: any): void;
    openBottomSheetModal(bottomSheetModal: any): void;
    open(param: any): void;
    private getDismissReason;
}
