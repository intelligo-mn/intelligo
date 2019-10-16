import { ElementRef, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../services/data.service';
export declare class DeployLandingComponent implements OnInit {
    private el;
    private snakbar;
    private route;
    private dataService;
    constructor(el: ElementRef, snakbar: MatSnackBar, route: ActivatedRoute, dataService: DataService);
    ngOnInit(): void;
    webOptions: AnaChatWebOptions;
    open(url: string): void;
    copied(): void;
    enableAutoOpen: boolean;
    loadSavedOptions(): void;
    saveOptions(): void;
    n(v: any): any;
    count: number;
    preview(): void;
    _oldVal: any;
    readonly webSnippet: string;
}
export interface AnaChatWebOptions {
    accentColor?: string;
    logoUrl?: string;
    title?: string;
    desc?: string;
    isFullPage?: boolean;
    autoOpenSecs?: number;
    allowChatReset?: boolean;
    enableHtmlMessages?: boolean;
    showPoweredByAna?: boolean;
    gmapsKey?: string;
    foregroundColor?: string;
    secondaryColor?: string;
    height?: string;
    width?: string;
    websdkUrl?: string;
    webSocketsUrl?: string;
    businessId?: string;
    flowId?: string;
}
