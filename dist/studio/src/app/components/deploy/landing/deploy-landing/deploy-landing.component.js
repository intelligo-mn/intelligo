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
const material_1 = require("@angular/material");
const router_1 = require("@angular/router");
const md5_1 = require("ts-md5/dist/md5");
const data_service_1 = require("../../../../services/data.service");
let DeployLandingComponent = class DeployLandingComponent {
    constructor(el, snakbar, route, dataService) {
        this.el = el;
        this.snakbar = snakbar;
        this.route = route;
        this.dataService = dataService;
        this.webOptions = {
            accentColor: 'red',
            allowChatReset: true,
            autoOpenSecs: 0,
            businessId: '',
            flowId: '',
            desc: '',
            enableHtmlMessages: true,
            foregroundColor: 'white',
            secondaryColor: 'black',
            gmapsKey: '',
            height: '70%',
            width: '360px',
            isFullPage: false,
            logoUrl: 'https://www.chatbots.mn/favicon.ico',
            showPoweredByAna: false,
            title: 'Chatbots.mn chatbot',
            websdkUrl: '',
            webSocketsUrl: '',
        };
        this.count = 0;
        this.route.queryParams.subscribe(x => {
            if (x && x['businessId']) {
                this.webOptions.businessId = x['businessId'];
            }
            if (x && x['chatFlowId']) {
                this.webOptions.flowId = x['chatFlowId'];
            }
            if (this.webOptions.businessId && this.webOptions.flowId) {
                this.loadSavedOptions();
            }
        });
    }
    ngOnInit() {
    }
    open(url) {
    }
    copied() {
        this.snakbar.open("Code copied", "dismiss", {
            duration: 1500
        });
    }
    loadSavedOptions() {
        let key = md5_1.Md5.hashStr(`${JSON.stringify(this.dataService.chatServer.ServerUrl)}|${this.webOptions.businessId}|${this.webOptions.flowId}`);
        let savedVal = localStorage.getItem(key);
        if (savedVal) {
            this.webOptions = JSON.parse(savedVal);
        }
    }
    saveOptions() {
        let key = md5_1.Md5.hashStr(`${JSON.stringify(this.dataService.chatServer.ServerUrl)}|${this.webOptions.businessId}|${this.webOptions.flowId}`);
        localStorage.setItem(key, JSON.stringify(this.webOptions));
    }
    n(v) {
        return (v ? v : '');
    }
    preview() {
        let src = `<!DOCTYPE html>
<html>
<head>
	<title>Chatbots.mn web chat preview</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
${this.webSnippet}
</body>
</html>`;
        var url = "data:text/html;base64," + btoa(src);
    }
    get webSnippet() {
        try {
            let newVal = JSON.stringify(this.webOptions);
            if (!this._oldVal || this._oldVal != newVal) {
                setTimeout(() => {
                    this.saveOptions();
                }, 0);
                this._oldVal = newVal;
            }
        }
        catch (e) { }
        return `<script type="text/javascript" id="ana-web-chat-script"

src="${this.n(this.webOptions.websdkUrl)}assets/embed/ana-web-chat-plugin.js" 
ana-api-endpoint="${this.n(this.dataService.chatServer).ServerUrl}"
ana-endpoint="${this.n(this.webOptions.webSocketsUrl)}/wscustomers/chatcustomers-websocket"
ana-iframe-src="${this.n(this.webOptions.websdkUrl)}index.html"
ana-businessid="${this.n(this.webOptions.businessId)}"
ana-flowid="${this.n(this.webOptions.flowId)}"

ana-logo-url="${this.n(this.webOptions.logoUrl)}"
ana-primary-bg="${this.n(this.webOptions.accentColor)}"
ana-agent-name="${this.n(this.webOptions.title)}"
ana-agent-desc="${this.n(this.webOptions.desc)}"
ana-frame-height="${this.n(this.webOptions.height)}"
ana-frame-width="${this.n(this.webOptions.width)}"

ana-primary-fg="${this.n(this.webOptions.foregroundColor)}"
ana-secondary-bg="${this.n(this.webOptions.secondaryColor)}"
ana-gmaps-key="${this.n(this.webOptions.gmapsKey)}"

${this.webOptions.isFullPage ? '\nana-fullpage="true"' : ''} ${this.webOptions.allowChatReset ? '\nana-allow-chat-reset="true"' : ''} ${this.webOptions.enableHtmlMessages ? '\nana-html-messages="true"' : ''} ${this.webOptions.showPoweredByAna ? '\nana-show-branding="true"' : ''} ${this.webOptions.autoOpenSecs ? '\nana-auto-open="' + this.webOptions.autoOpenSecs + '"' : ''}>
</script>`;
    }
};
DeployLandingComponent = __decorate([
    core_1.Component({
        selector: 'app-deploy-landing',
        templateUrl: './deploy-landing.component.html',
        styleUrls: ['./deploy-landing.component.scss']
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        material_1.MatSnackBar,
        router_1.ActivatedRoute,
        data_service_1.DataService])
], DeployLandingComponent);
exports.DeployLandingComponent = DeployLandingComponent;
//# sourceMappingURL=deploy-landing.component.js.map