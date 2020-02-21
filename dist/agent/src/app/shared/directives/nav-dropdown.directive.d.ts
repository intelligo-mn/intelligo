import { ElementRef } from '@angular/core';
export declare class NavDropdownDirective {
    private el;
    constructor(el: ElementRef);
    toggle(): void;
}
export declare class NavDropdownToggleDirective {
    private dropdown;
    constructor(dropdown: NavDropdownDirective);
    toggleOpen($event: any): void;
}
export declare const NavDropDownDirectives: (typeof NavDropdownDirective | typeof NavDropdownToggleDirective)[];
