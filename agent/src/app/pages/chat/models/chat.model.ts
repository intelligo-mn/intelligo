import { uuid } from "../../../shared/util/uuid";

export class Chat {
	threads: Array<any>;
	messages:Array<any>;
}

export class chatProfiles {
	userId: string;
	threadId: string;
	displayName: string;
	email: string;
	img: string;
	status: string;
}
