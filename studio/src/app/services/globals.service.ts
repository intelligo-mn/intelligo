import { Injectable } from '@angular/core';
import * as models from '../models/chatflow.models';
import { IntelligoDate, IntelligoTime, AddressInput, GeoLoc } from '../models/intelligo-chat.models';
import { Title } from '@angular/platform-browser';
import { ChatFlowComponent } from '../components/studio/chatflow/chatflow.component';
import { ObjectID } from 'bson';
import { SectionType, CarouselSection } from '../models/chatflow.models';

@Injectable()
export class GlobalsService {
	constructor(private title: Title) {
	}
	appName = 'Chatbots.mn';

	chatFlowComponent: ChatFlowComponent;
	loading: boolean = false;

	setPageTitle(title?: string) {
		if (title)
			this.title.setTitle(`${title} - ${this.appName}`);
		else
			this.title.setTitle(this.appName);
	}

	downloadTextAsFile(filename, text) {
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

	uuidv4() {
		return (<any>[1e7] + -1e3 + -4e3 + -8e3 + -1e11).toString().replace(/[018]/g,
			c => (<any>c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> <any>c / 4).toString(16)
		)
	}
	getVariableType(x) {
		if (Array.isArray(x)) return VariableType.Array;
		else if (typeof x == 'string') return VariableType.String;
		else if (x != null && typeof x == 'object') return VariableType.Object;
		else return VariableType.Other;
	}

	anaDateDisplay(anaDate: IntelligoDate) {
		return `${parseInt(anaDate.mday)}-${parseInt(anaDate.month)}-${parseInt(anaDate.year)}`;
	}

	anaTimeDisplay(anaTime: IntelligoTime) {
		let hr = parseInt(anaTime.hour);
		let min = parseInt(anaTime.minute);

		var hours: any = hr > 12 ? hr - 12 : hr;
		var am_pm = hr >= 12 ? "PM" : "AM";
		hours = hours < 10 ? "0" + hours : hours;
		var minutes = min < 10 ? "0" + min : min;

		return hours + ":" + minutes + " " + am_pm;
	}

	anaAddressDisplay(anaAddress: AddressInput) {
		return [anaAddress.line1, anaAddress.area, anaAddress.city, anaAddress.state, anaAddress.country, anaAddress.pin].filter(x => x).join(", ");
	}

	anaLocationDisplay(anaLoc: GeoLoc) {
		return `${anaLoc.lat},${anaLoc.lng}`;
	}

	EMAIL_REGEX = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/;
	emailValid(val: string) {
		if (val)
			return this.EMAIL_REGEX.test(val);
		return false;
	}

	PHONE_REGEX = /^\+?\d{6,15}$/;
	phoneValid(val: string) {
		if (val)
			return this.PHONE_REGEX.test(val);
		return false;
	}
	
	pwdMatch(p1: string, p2: string) {
		if (!p1) return false;
		if (p1.length < 6) return false;
		return p1 == p2;
	}

	normalizeChatNodes(chatNodes: models.ChatNode[]) {
		chatNodes.forEach(x => {
			x.IsStartNode = x.IsStartNode ? true : false //This field should exist even if it's false
		});
		return chatNodes;
	}

	cloneNode(srcNode: models.ChatNode) {
		if (!srcNode) {
			return false;
		}
		let targetNode = JSON.parse(JSON.stringify(srcNode)) as models.ChatNode;
		targetNode.Id = new ObjectID().toHexString();
		targetNode.Name += " Copy";
		targetNode.NextNodeId = null;
		if (targetNode.Buttons) {
			targetNode.Buttons.forEach(btn => {
				btn._id = new ObjectID().toHexString();
				btn.NextNodeId = null;
			});
		}
		if (targetNode.Sections) {
			targetNode.Sections.forEach(section => {
				section._id = new ObjectID().toHexString();
				if (section.SectionType == SectionType.Carousel) {
					let car = section as CarouselSection;
					car.Items.forEach(carItem => {
						carItem._id = new ObjectID().toHexString();
						carItem.Buttons.forEach(carBtn => {
							carBtn._id = new ObjectID().toHexString();
							carBtn.NextNodeId = null;
						});
					});
				}
			});
		}
		return targetNode;
	}
}

export enum VariableType {
	Array, String, Object, Other
}
