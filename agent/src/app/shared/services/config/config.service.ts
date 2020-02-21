import { Injectable } from "@angular/core";
import { LoginResponse, LoginData } from "app/shared/services/data/data.service";
declare var $: any;

@Injectable()
export class ConfigService {
	public app: AppInfo;
	public profile: UserProfile;

	public appLayout: any;
	public breakpoint: any;

	constructor() {
		this.app = {
            name: "ANA Chat Panel",
			webSocketEndPoint: "http://anachatagents-dev.2bm4ipugmm.ap-south-1.elasticbeanstalk.com/chatagents",
			apiGatewayEndPoint: "http://chat-dev.nowfloatsdev.com",
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

	getUserProfileFromLoginDetails(loginDetails: LoginData): UserProfile {
		return {
			user: loginDetails.name,
			userEmail: loginDetails.name,
			userId: loginDetails.userId,
			businessId: loginDetails.businessId,
			accessToken: loginDetails.accessToken,
			loginData: loginDetails
		};
	}

}


export interface UserProfile {
	userId: string,
	user: string,
	businessId: string;
	userEmail: string,
	userImg?: string,
	userTitle?: string,
	accessToken: string,
	isProfileVisible?: boolean;
	loginData?: LoginData;
}

export interface AppInfo {
	name: string,
	webSocketEndPoint: string,
	apiGatewayEndPoint: string
}