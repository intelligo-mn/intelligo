export class Note {
	id: number;
	title: string = "";
	content: string = "";

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
