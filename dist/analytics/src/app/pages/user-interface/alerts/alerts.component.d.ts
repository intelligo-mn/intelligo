export declare class AlertsComponent {
    alerts: Array<IAlert>;
    private backup;
    private _success;
    staticAlertClosed: boolean;
    successMessage: string;
    constructor();
    closeAlert(alert: IAlert): void;
    reset(): void;
    ngOnInit(): void;
    changeSuccessMessage(): void;
}
export interface IAlert {
    id: number;
    type: string;
    message: string;
}
