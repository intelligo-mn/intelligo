"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const environment_1 = require("../../../../environments/environment");
let SimulatorFrameComponent = class SimulatorFrameComponent {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.isOpen = false;
        let param = {
            brandingConfig: {
                primaryBackgroundColor: "#5e72e4",
                primaryForegroundColor: "white",
                secondaryBackgroundColor: "#3c3c3c",
                logoUrl: `favicon.ico`,
                agentName: "Chatbots.mn",
                frameHeight: "100%",
                frameWidth: "360px"
            },
            simulatorMode: true,
            appConfig: {
                htmlMessages: true
            }
        };
        let url = `https://simulator.chatbots.mn/?s=${btoa(JSON.stringify(param))}`;
        if (environment_1.environment.local)
            url = `http://localhost:4200/index.html?s=${btoa(JSON.stringify(param))}`;
        this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    ngOnInit() { }
    frame() {
        return this.simulatorIFrame.nativeElement
            .contentWindow;
    }
    minMaxBtnClick() {
        this.isOpen = !this.isOpen;
        if (this.intelligoRoot && this.intelligoRoot.nativeElement)
            this.intelligoRoot.nativeElement.classList.remove("intelligo-hidden");
    }
};
__decorate([
    core_1.ViewChild("intelligoRoot", { static: false }),
    __metadata("design:type", core_1.ElementRef)
], SimulatorFrameComponent.prototype, "intelligoRoot", void 0);
__decorate([
    core_1.ViewChild("simulatorIFrame", { static: false }),
    __metadata("design:type", core_1.ElementRef)
], SimulatorFrameComponent.prototype, "simulatorIFrame", void 0);
SimulatorFrameComponent = __decorate([
    core_1.Component({
        selector: "app-simulator-frame",
        templateUrl: "./simulator-frame.component.html",
        styleUrls: ["./simulator-frame.component.scss"]
    }),
    __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
], SimulatorFrameComponent);
exports.SimulatorFrameComponent = SimulatorFrameComponent;
//# sourceMappingURL=simulator-frame.component.js.map