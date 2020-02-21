import { Observable } from 'rxjs/Observable';
export declare class TabsPillsComponent {
    currentJustify: string;
    justifyRight: string;
    verticalOrientation: string;
    horizontalOrientation: string;
    tabLinks: {
        label: string;
        link: string;
    }[];
    tabs: ({
        label: string;
        content: string;
        disabled?: undefined;
        extraContent?: undefined;
    } | {
        label: string;
        disabled: boolean;
        content: string;
        extraContent?: undefined;
    } | {
        label: string;
        extraContent: boolean;
        content: string;
        disabled?: undefined;
    })[];
    activeTabIndex: number;
    addTabPosition: number;
    gotoNewTabAfterAdding: boolean;
    createWithLongContent: boolean;
    dynamicTabs: ({
        label: string;
        content: string;
        disabled?: undefined;
        extraContent?: undefined;
    } | {
        label: string;
        disabled: boolean;
        content: string;
        extraContent?: undefined;
    } | {
        label: string;
        extraContent: boolean;
        content: string;
        disabled?: undefined;
    })[];
    asyncTabs: Observable<any>;
    constructor();
    addTab(includeExtraContent: boolean): void;
    deleteTab(tab: any): void;
    swapTabLinks(): void;
    addToLabel(): void;
}
