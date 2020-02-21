import { Component, ElementRef, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { DataService } from '../../../../services/data.service';

@Component({
	selector: 'app-deploy-landing',
	templateUrl: './deploy-landing.component.html',
	styleUrls: ['./deploy-landing.component.scss']
})
export class DeployLandingComponent implements OnInit {

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
		logoUrl: 'https://www.chatbots.mn/favicon.ico',
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
	<title>Chatbots.mn web chat preview</title>
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
		return `<script type="text/javascript" id="intelligo-web-chat-script"

src="${this.n(this.webOptions.websdkUrl)}assets/embed/intelligo-web-chat-plugin.js" 
intelligo-api-endpoint="${this.n(this.dataService.chatServer).ServerUrl}"
intelligo-endpoint="${this.n(this.webOptions.webSocketsUrl)}/wscustomers/chatcustomers-websocket"
intelligo-iframe-src="${this.n(this.webOptions.websdkUrl)}index.html"
intelligo-businessid="${this.n(this.webOptions.businessId)}"
intelligo-flowid="${this.n(this.webOptions.flowId)}"

intelligo-logo-url="${this.n(this.webOptions.logoUrl)}"
intelligo-primary-bg="${this.n(this.webOptions.accentColor)}"
intelligo-agent-name="${this.n(this.webOptions.title)}"
intelligo-agent-desc="${this.n(this.webOptions.desc)}"
intelligo-frame-height="${this.n(this.webOptions.height)}"
intelligo-frame-width="${this.n(this.webOptions.width)}"

intelligo-primary-fg="${this.n(this.webOptions.foregroundColor)}"
intelligo-secondary-bg="${this.n(this.webOptions.secondaryColor)}"
intelligo-gmaps-key="${this.n(this.webOptions.gmapsKey)}"

${this.webOptions.isFullPage ? '\nintelligo-fullpage="true"' : ''} ${this.webOptions.allowChatReset ? '\nintelligo-allow-chat-reset="true"' : ''} ${this.webOptions.enableHtmlMessages ? '\nintelligo-html-messages="true"' : ''} ${this.webOptions.showPoweredByAna ? '\nintelligo-show-branding="true"' : ''} ${this.webOptions.autoOpenSecs ? '\nintelligo-auto-open="' + this.webOptions.autoOpenSecs + '"' : ''}>
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
