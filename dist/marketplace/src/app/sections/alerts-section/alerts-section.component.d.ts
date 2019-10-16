export interface IAlert {
    id: number;
    type: string;
    strong?: string;
    message: string;
    icon?: string;
}
export declare class AlertsSectionComponent {
    alerts: Array<IAlert>;
    private backup;
    constructor();
    close(alert: IAlert): void;
}
