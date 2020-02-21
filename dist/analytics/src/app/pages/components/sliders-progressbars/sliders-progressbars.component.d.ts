export declare class SlidersProgressbarsComponent {
    demo: number;
    val: number;
    min: number;
    max: number;
    disabledValue: number;
    color: string;
    determinateProgressValue: number;
    bufferProgressValue: number;
    bufferBufferValue: number;
    stepDeterminateProgressVal(val: number): void;
    stepBufferProgressVal(val: number): void;
    stepBufferBufferVal(val: number): void;
    private clampValue;
}
