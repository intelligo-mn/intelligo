export declare class PreloaderService {
    private static _loaders;
    static registerLoader(method: Promise<any>): void;
    static clear(): void;
    static load(): Promise<any>;
    private static _executeAll;
}
