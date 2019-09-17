import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalsService } from './services/globals.service';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	constructor(
		public translate: TranslateService,
		public global: GlobalsService,
		public router: Router,
		public dialog: MatDialog) {
		translate.addLangs(['mn', 'en']);
		translate.setDefaultLang('mn');
		const browserLang = translate.getBrowserLang();
		translate.use(browserLang.match(/en|mn/) ? browserLang : 'mn');
	}

	loading() {
		return this.global.loading;
	}
	hideLoading() {
		this.global.loading = false;
	}

	goto(path: string) {
		this.router.navigateByUrl(path);
	}

}
