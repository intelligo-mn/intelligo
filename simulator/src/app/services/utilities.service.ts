import { Injectable } from '@angular/core';

import { ANATime, ANADate, ANAMeta, SenderType, GeoLoc, MediaType, AddressInput } from '../models/ana-chat.models';
import { GoogleMapsConfig } from '../models/google-maps-config.model';
import { AppSettings, BrandingConfig, AppConfig, ThirdPartyConfig } from '../models/ana-config.models';
@Injectable()
export class UtilitiesService {
	static googleMapsConfigRef: GoogleMapsConfig = { apiKey: '' };
	static settings: AppSettings;

	constructor() { }

	static uuidv4() {
		return (<any>[1e7] + -1e3 + -4e3 + -8e3 + -1e11).toString().replace(/[018]/g,
			c => (<any>c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> <any>c / 4).toString(16)
		)
	}

	static anaDateDisplay(anaDate: ANADate) {
		return `${parseInt(anaDate.mday)}-${parseInt(anaDate.month)}-${parseInt(anaDate.year)}`;
	}

	static anaDateToDate(anaDate: ANADate) {
		return new Date(parseInt(anaDate.year), parseInt(anaDate.month) - 1, parseInt(anaDate.mday));
	}
	static anaTimeToDate(anaTime: ANATime) {
		let d = new Date();
		d.setHours(parseInt(anaTime.hour), parseInt(anaTime.minute), parseInt(anaTime.second));
		return d;
	}

	static anaTimeDisplay(anaTime: ANATime) {
		let hr = parseInt(anaTime.hour);
		let min = parseInt(anaTime.minute);

		let hours: any = hr > 12 ? hr - 12 : hr;
		let am_pm = hr >= 12 ? "PM" : "AM";
		hours = hours < 10 ? "0" + hours : hours;
		let minutes = min < 10 ? "0" + min : min;

		return hours + ":" + minutes + " " + am_pm;
	}

	static getReplyMeta(srcMeta: ANAMeta, copyId?: boolean, copyRespTo?: boolean) {
		let replyMeta: ANAMeta = {
			id: copyId ? srcMeta.id : this.uuidv4(),
			recipient: srcMeta.sender,
			responseTo: copyRespTo ? srcMeta.responseTo : srcMeta.id,
			sender: srcMeta.recipient,
			senderType: SenderType.USER,
			sessionId: srcMeta.sessionId,
			flowId: srcMeta.flowId,
			previousFlowId: srcMeta.previousFlowId,
			currentFlowId: srcMeta.currentFlowId,
			timestamp: new Date().getTime()
		};
		return replyMeta;
	}

	static googleMapsStaticLink(latLng: GeoLoc) {
		return `https://maps.googleapis.com/maps/api/staticmap?center=${latLng.lat},${latLng.lng}&zoom=13&size=300x150&maptype=roadmap&markers=color:red|label:A|${latLng.lat},${latLng.lng}&key=${UtilitiesService.googleMapsConfigRef.apiKey}`;
	}

	static getAnaMediaTypeFromMIMEType(mimeType: string) {
		let assetType: MediaType;
		if (mimeType.startsWith('image'))
			assetType = MediaType.IMAGE;
		else if (mimeType.startsWith('video'))
			assetType = MediaType.VIDEO;
		else if (mimeType.startsWith('audio'))
			assetType = MediaType.AUDIO;
		else
			assetType = MediaType.FILE;
		return assetType;
	}

	static anaAddressDisplay(anaAddress: AddressInput) {
		return [anaAddress.line1, anaAddress.area, anaAddress.city, anaAddress.state, anaAddress.country, anaAddress.pin].filter(x => x).join(", ");
	}

	static pad(number: number, width: number, z = '0') {
		let n = number + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}

	private static _isMobile: boolean | null = null;
	static isMobile() {
		if (this._isMobile === null) {
			let check = false;
			(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || (<any>window).opera);
			this._isMobile = check;
		}
		return this._isMobile;
	};
}

export class Config {
	static emailRegex: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
	static phoneRegex: RegExp = /^\+?\d{6,15}$/;
	static numberRegex: RegExp = /^[0-9]*\.?[0-9]+$/;

	static consecutiveErrorsThreshold = 5;
	static consecutiveErrorsMessageText = "Uh oh, seems like you've lost your internet connection";
	static consecutiveErrorsMessageAckId = "CONSECUTIVE_ERRORS_MESSAGE";

	static simulatorBusinessId = 'ana-studio';
	static simulatorCustomerId = 'ana-simulator';
}
