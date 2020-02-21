import { ChartType } from "../demo/chartist.demo";
import * as Chartist from "chartist";
declare class ChartistLineComponent {
    type: ChartType;
    data: Chartist.IChartistData;
    options: any;
    chartTypes: ChartType[];
    constructor();
}
export { ChartistLineComponent };
