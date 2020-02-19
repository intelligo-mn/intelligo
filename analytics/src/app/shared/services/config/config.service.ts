import { Injectable } from "@angular/core";
declare var $: any;

@Injectable()
export class ConfigService {
	public app: any;
	public profile: any;
	public appLayout: any;
	public breakpoint: any;

	constructor() {
		this.app = {
			name: "MaterialLab"
		};
		this.profile = {
			user: "Fredrick Palmer",
			userId:"160d0948-62a7-4439-98aa-0b95f1143b0d",
			userEmail:"fredrick@materiallab.pro",
			userImg:"/assets/img/profiles/18.jpg",
			userTitle:"Frontend Developer",
			isProfileVisible: true,
		};
		this.appLayout = {
			isApp_Boxed: false,
			isApp_SidebarLeftCollapsed: false,
			isApp_MobileSidebarLeftOpen: false,
			isApp_SidebarRightOpen: false,
			isApp_BackdropVisible: false
		};
		this.breakpoint = {
			desktopLG: 1280,
			desktop: 992,
			tablet: 768,
			mobile: 576
		};
	}
}
