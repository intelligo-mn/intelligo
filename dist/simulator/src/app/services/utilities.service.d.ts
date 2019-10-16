import { AddressInput, ANADate, ANAMeta, ANATime, GeoLoc, MediaType } from '../models/ana-chat.models';
import { AppSettings } from '../models/ana-config.models';
import { GoogleMapsConfig } from '../models/google-maps-config.model';
export declare class UtilitiesService {
    static googleMapsConfigRef: GoogleMapsConfig;
    static settings: AppSettings;
    constructor();
    static uuidv4(): any;
    static anaDateDisplay(anaDate: ANADate): string;
    static anaDateToDate(anaDate: ANADate): Date;
    static anaTimeToDate(anaTime: ANATime): Date;
    static anaTimeDisplay(anaTime: ANATime): string;
    static getReplyMeta(srcMeta: ANAMeta, copyId?: boolean, copyRespTo?: boolean): ANAMeta;
    static googleMapsStaticLink(latLng: GeoLoc): string;
    static getAnaMediaTypeFromMIMEType(mimeType: string): MediaType;
    static anaAddressDisplay(anaAddress: AddressInput): string;
    static pad(number: number, width: number, z?: string): string;
    private static _isMobile;
    static isMobile(): boolean;
}
export declare class Config {
    static emailRegex: RegExp;
    static phoneRegex: RegExp;
    static numberRegex: RegExp;
    static consecutiveErrorsThreshold: number;
    static consecutiveErrorsMessageText: string;
    static consecutiveErrorsMessageAckId: string;
    static simulatorBusinessId: string;
    static simulatorCustomerId: string;
}
