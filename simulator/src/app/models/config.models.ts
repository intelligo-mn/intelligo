import { StompConfig } from "../services/stomp.service";

export interface ThirdPartyConfig {
  googleMapsKey: string;
}

export interface AppConfig {
  fileUploadEndpoint: string;
  apiEndpoint: string;
  initVerbs: {
    [key: string]: string;
  };
  htmlMessages: boolean;
  allowFlowReset: boolean;
  fullpage: boolean;
  msgSounds: boolean;
}

export interface BrandingConfig {
  primaryBackgroundColor: string;
  primaryForegroundColor: string;
  secondaryBackgroundColor: string;
  logoUrl: string;
  logoClickUrl: string;
  agentName: string;
  agentDesc: string;
  frameHeight: string;
  frameWidth: string;
  frameContentWidth: string;
}

export interface AppSettings {
  stompConfig?: StompConfig;
  simulatorMode?: boolean;
  thirdPartyConfig?: ThirdPartyConfig;
  brandingConfig?: BrandingConfig;
  appConfig?: AppConfig;
}
