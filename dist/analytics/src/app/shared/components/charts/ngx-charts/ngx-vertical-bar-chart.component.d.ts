import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
export declare class NgxChartsBarVerticalDemoComponent implements OnInit {
    ngOnInit(): void;
    single: any[];
    multi: any[];
    view: any[];
    showXAxis: boolean;
    showYAxis: boolean;
    showLegend: boolean;
    showXAxisLabel: boolean;
    xAxisLabel: string;
    showYAxisLabel: boolean;
    colorScheme: {
        domain: string[];
    };
    constructor();
    onSelect(event: any): void;
}
