import { OnInit, OnChanges, OnDestroy } from "@angular/core";
export declare class ng2LineChartDemoComponent implements OnInit, OnChanges, OnDestroy {
    Count: number;
    initial: number;
    changedSecond: boolean;
    totalCount: number;
    pageCount: number;
    changed: boolean;
    chartData: any[];
    chartLabel: any[];
    lineChartData: Array<any>;
    lineChartLabels: Array<any>;
    lineChartOptions: any;
    lineChartColors: Array<any>;
    lineChartLegend: boolean;
    lineChartType: string;
    chartClicked(e: any): void;
    chartHovered(e: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(): void;
    dataReturn(dataCount: any): any[];
    labelReturn(labelCount: any): any[];
    incGraph(): void;
    decGraph(): void;
}
