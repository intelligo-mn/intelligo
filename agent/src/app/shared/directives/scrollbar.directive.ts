import {Directive, ElementRef, OnInit} from '@angular/core';
declare var $:any;  //<-- let typescript compiler know your referencing a var that was already declared

@Directive({
    selector: 'scrollbar',
    host: {'class':'mCustomScrollbar'},  //<-- Make sure you add the class
})
export class ScrollbarDirective implements OnInit {
    el: ElementRef;
    constructor(el:ElementRef) {
        this.el = el;
    }
    ngOnInit() {
        $(this.el.nativeElement).mCustomScrollbar({
            autoHideScrollbar: false,
            theme: "light",
            advanced: {
                updateOnContentResize: true
            }
    })
	}
}
