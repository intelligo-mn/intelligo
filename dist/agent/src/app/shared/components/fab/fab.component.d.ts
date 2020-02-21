import { EventEmitter, AfterContentInit, ElementRef, Renderer, QueryList } from "@angular/core";
import { MdButton } from "@angular/material";
export declare class SmdFabSpeedDialTriggerComponent {
    private _parent;
    readonly sp: boolean;
    spin: boolean;
    constructor(_parent: SmdFabSpeedDialComponent);
    _onClick(event: any): void;
}
export declare class SmdFabSpeedDialActionsComponent implements AfterContentInit {
    private _parent;
    private renderer;
    _buttons: QueryList<MdButton>;
    constructor(_parent: SmdFabSpeedDialComponent, renderer: Renderer);
    ngAfterContentInit(): void;
    private initButtonStates;
    show(): void;
    hide(): void;
    private getTranslateFunction;
    private changeElementStyle;
}
export declare class SmdFabSpeedDialComponent implements AfterContentInit {
    private elementRef;
    private renderer;
    private isInitialized;
    private _direction;
    private _open;
    private _animationMode;
    fixed: boolean;
    open: boolean;
    direction: string;
    animationMode: string;
    openChange: EventEmitter<boolean>;
    _childActions: SmdFabSpeedDialActionsComponent;
    constructor(elementRef: ElementRef, renderer: Renderer);
    ngAfterContentInit(): void;
    toggle(): void;
    _onClick(): void;
    setActionsVisibility(): void;
    private _setElementClass;
}
