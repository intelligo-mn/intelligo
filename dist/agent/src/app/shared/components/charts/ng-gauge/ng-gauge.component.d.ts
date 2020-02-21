import { GaugeSegment, GaugeLabel } from "./shared/index";
export declare class salesGaugeComponent {
    colors: {
        pink: string;
        grey: string;
    };
    progressGraph1: {
        bgRadius: number;
        bgColor: string;
        rounded: boolean;
        reverse: boolean;
        animationSecs: number;
        labels: GaugeLabel[];
        segments: GaugeSegment[];
    };
}
export declare class signupGaugeComponent {
    colors: {
        blue: string;
        grey: string;
    };
    progressGraph2: {
        bgRadius: number;
        bgColor: string;
        rounded: boolean;
        reverse: boolean;
        animationSecs: number;
        labels: GaugeLabel[];
        segments: GaugeSegment[];
    };
}
