import { ActivatedRoute } from '@angular/router';
import { AppSettings } from './models/ana-config.models';
import { APIService } from './services/api.service';
import { MatCSSService } from './services/mat-css.service';
import { SimulatorService } from './services/simulator.service';
import { StompService } from './services/stomp.service';
import { UtilitiesService } from './services/utilities.service';
export declare class AppComponent {
    private route;
    private apiService;
    private stomp;
    private simulator;
    private utils;
    private matCSS;
    constructor(route: ActivatedRoute, apiService: APIService, stomp: StompService, simulator: SimulatorService, utils: UtilitiesService, matCSS: MatCSSService);
    setAppSettings(settings: AppSettings): void;
    getCustomStyle(accent?: string, secondary?: string, accentFG?: string, contentWidth?: string): void;
}
