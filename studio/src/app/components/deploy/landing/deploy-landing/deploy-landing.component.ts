import { Component, OnInit, ElementRef } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
	selector: 'app-deploy-landing',
	templateUrl: './deploy-landing.component.html',
	styleUrls: ['./deploy-landing.component.scss']
})
export class DeployLandingComponent implements OnInit{

	constructor(
		private el: ElementRef,
		private snakbar: MatSnackBar,
		private route: ActivatedRoute,
		private dataService: DataService) {
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

	webOptions: AnaChatWebOptions = {
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
		logoUrl: 'https://www.ana.chat/favicon.ico',
		showPoweredByAna: false,
		title: 'Chatbots.mn chatbot',
		websdkUrl: '',
		webSocketsUrl: '',
	};

	open(url: string) {
		// if (this.electron.isElectronApp) {
		// 	this.electron.shell.openExternal(url);
		// } else {
		// 	window.open(url, '_blank');
		// }
	}

	// openElectronWindow(url: string) {
	// 	if (!this.electron.isElectronApp) {
	// 		window.open(url);
	// 		return;
	// 	}
	// 	let win = new this.electron.remote.BrowserWindow();
	// 	win.on('closed', () => {
	// 		win = null
	// 	});
	// 	win.loadURL(url);
	// }

	copied() {
		this.snakbar.open("Code copied", "dismiss", {
			duration: 1500
		});
	}
	enableAutoOpen: boolean;

	loadSavedOptions() {
		let key = Md5.hashStr(`${JSON.stringify(this.dataService.chatServer.ServerUrl)}|${this.webOptions.businessId}|${this.webOptions.flowId}`) as string;
		let savedVal = localStorage.getItem(key);
		if (savedVal) {
			this.webOptions = JSON.parse(savedVal);
		}
	}

	saveOptions() {
		let key = Md5.hashStr(`${JSON.stringify(this.dataService.chatServer.ServerUrl)}|${this.webOptions.businessId}|${this.webOptions.flowId}`) as string;
		localStorage.setItem(key, JSON.stringify(this.webOptions));
	}

	n(v) {
		return (v ? v : '');
	}
	count = 0;

	preview() {
		let src = `<!DOCTYPE html>
<html>
<head>
	<title>Ana web chat preview</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
${this.webSnippet}
</body>
</html>`;

		var url = "data:text/html;base64," + btoa(src);
		// this.openElectronWindow(url);
	}

	_oldVal;
	get webSnippet() {
		try {
			let newVal = JSON.stringify(this.webOptions);
			if (!this._oldVal || this._oldVal != newVal) {
				setTimeout(() => {
					this.saveOptions();
				}, 0);
				this._oldVal = newVal;
			}
		} catch (e) { }
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
