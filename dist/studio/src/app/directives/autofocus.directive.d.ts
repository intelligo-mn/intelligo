import { ElementRef } from "@angular/core";
export declare class AutofocusDirective {
    private el;
    private _autofocus;
    constructor(el: ElementRef);
    ngOnInit(): void;
    autofocus: boolean;
}
