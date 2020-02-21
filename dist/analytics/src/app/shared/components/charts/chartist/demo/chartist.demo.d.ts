import { ElementRef, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import * as Chartist from 'chartist';
export declare type ChartType = 'Pie' | 'Bar' | 'Line';
export declare type ChartInterfaces = Chartist.IChartistPieChart | Chartist.IChartistBarChart | Chartist.IChartistLineChart;
export declare type ChartOptions = Chartist.IBarChartOptions | Chartist.ILineChartOptions | Chartist.IPieChartOptions;
export declare type ResponsiveOptionTuple = Chartist.IResponsiveOptionTuple<ChartOptions>;
export declare type ResponsiveOptions = Array<ResponsiveOptionTuple>;
export interface ChartEvent {
    [eventName: string]: (data: any) => void;
}
export declare class ChartistComponent implements OnInit, OnChanges, OnDestroy {
    data: (Promise<Chartist.IChartistData> | Chartist.IChartistData);
    type: (Promise<ChartType> | ChartType);
    options: (Promise<Chartist.IChartOptions> | Chartist.IChartOptions);
    responsiveOptions: (Promise<ResponsiveOptions> | ResponsiveOptions);
    events: ChartEvent;
    chart: ChartInterfaces;
    private element;
    constructor(element: ElementRef);
    ngOnInit(): Promise<ChartInterfaces>;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    renderChart(): Promise<ChartInterfaces>;
    update(changes: SimpleChanges): void;
    bindEvents(chart: any): void;
}
export declare class ChartistModule {
}
declare const _default: {
    directives: (typeof ChartistComponent)[];
};
export default _default;
