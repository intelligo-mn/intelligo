import { Component, OnInit, Injectable, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { GlobalsService } from '../../../services/globals.service';
import { ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { environment } from '../../../../environments/environment';
import { AppHeaderBarComponent } from '../../shared/app-header-bar/app-header-bar.component';
import { InfoDialogService } from '../../../services/info-dialog.service';

@Component({
	selector: 'app-analytics-frame',
	templateUrl: './analytics-frame.component.html',
	styleUrls: ['./analytics-frame.component.css']
})
export class AnalyticsFrameComponent implements OnInit {

	ngAfterViewInit(): void {
		if (this.appHeader) {
			this.appHeader.goBack = () => {
				this.infoDialog.confirm('Go back to home page?', 'Are you sure you want to exit from analytics and go back to home page?', (ok) => {
					if (ok) {
						this.router.navigateByUrl('');
					}
				});
			};
		}
	}

	@ViewChild(AppHeaderBarComponent)
	appHeader: AppHeaderBarComponent;

	@ViewChild('analyticsFrame')
	analyticsFrame: ElementRef;

	iframeUrl: string | SafeUrl = "";
	constructor(
		private sanitizer: DomSanitizer,
		private globals: GlobalsService,
		private router: Router,
		private infoDialog: InfoDialogService,
		private route: ActivatedRoute) {

		this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

		console.log('AnalyticsFrameComponent');
		this.route.queryParams.subscribe(x => {
			console.log('Params of analytics frame');
			console.log(x);
			if (x['apiBase'] && x['businessId'] && x['businessName'] && x['chatFlowId']) {
				let initialUrl = `/index.html#/?apiBase=${encodeURIComponent(x['apiBase'])}&businessId=${x['businessId']}&businessName=${encodeURIComponent(x['businessName'])}&chatFlowId=${x['chatFlowId']}`;
				let url = "analytics-dashboard" + initialUrl;

				if (environment.local)
					url = "http://localhost:4202" + initialUrl;

				console.log('Analytics Frame Url');
				console.log(url);
				this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
			}
		})
	}

	ngOnInit() {
	}

}

@Injectable()
export class CanActivateAnalyticsFrameComponent implements CanActivate {
	constructor(
		private dataService: DataService) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot) {
		return true; //this.dataService.isSuperAdmin()
	}
}