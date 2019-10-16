import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
export declare class NgbdModalContent {
    activeModal: NgbActiveModal;
    name: any;
    constructor(activeModal: NgbActiveModal);
}
export declare class NgbdModalComponent {
    private modalService;
    constructor(modalService: NgbModal);
    open(): void;
}
