import { LoginData } from "app/shared/services/data/data.service";
export declare class ConfigService {
    app: AppInfo;
    profile: UserProfile;
    appLayout: any;
    breakpoint: any;
    constructor();
    getUserProfileFromLoginDetails(loginDetails: LoginData): UserProfile;
}
export interface UserProfile {
    userId: string;
    user: string;
    businessId: string;
    userEmail: string;
    userImg?: string;
    userTitle?: string;
    accessToken: string;
    isProfileVisible?: boolean;
    loginData?: LoginData;
}
export interface AppInfo {
    name: string;
    webSocketEndPoint: string;
    apiGatewayEndPoint: string;
}
