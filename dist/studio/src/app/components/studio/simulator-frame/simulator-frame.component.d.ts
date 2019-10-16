import { OnInit, ElementRef } from "@angular/core";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
export declare class SimulatorFrameComponent implements OnInit {
    private sanitizer;
    constructor(sanitizer: DomSanitizer);
    ngOnInit(): void;
    iframeUrl: SafeResourceUrl;
    isOpen: boolean;
    intelligoRoot: ElementRef;
    simulatorIFrame: ElementRef;
    frame(): Window;
    minMaxBtnClick(): void;
}
