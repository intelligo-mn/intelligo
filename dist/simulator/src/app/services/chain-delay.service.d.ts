export declare class ChainDelayService {
    constructor();
    private queue;
    private timer;
    private schedule;
    delay(fn: (queueLength: number) => any, t: number): void;
    cancel(): void;
}
