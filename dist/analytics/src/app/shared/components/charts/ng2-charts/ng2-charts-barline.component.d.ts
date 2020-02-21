import { OnInit, OnChanges } from "@angular/core";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
export declare class ng2BarLineChartDemoComponent implements OnInit, OnChanges, OnDestroy {
    lastDataIndex: number;
    initial: number;
    type: string;
    flag: number;
    totalPageCount: any;
    changedSecond: boolean;
    totalCount: number;
    pageCount: number;
    changed: boolean;
    chartData: any[];
    barChartOptions: any;
    barChartLabels: string[];
    chartLabel: string[];
    barChartType: string;
    barChartLegend: boolean;
    barChartData: any[];
    barChartColors: Array<any>;
    constructor();
    ngOnInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    dataReturn(lastDataIndex: any): any[];
    labelReturn(lastLabelIndex: any): any[];
    incGraph(): void;
    decGraph(): void;
}
