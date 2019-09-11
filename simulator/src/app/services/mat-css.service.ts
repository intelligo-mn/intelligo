import { Injectable } from '@angular/core';

let MAT_CSS = require('../../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css');
@Injectable()
export class MatCSSService {
	constructor() { }

	loadCustomMatTheme(accent: string, customStyle: HTMLStyleElement, appCSS: string) {
		let c1 = /#3f51b5/g;
		let c2 = /#ff4081/g;
		let c3 = /#f44336/g;

		//Replacing mat default theme colors with the requested accent color
		let resultCSS = MAT_CSS.replace(c1, accent).replace(c2, accent).replace(c3, accent) + "\r\n" + appCSS;
		customStyle.innerHTML = resultCSS;
	}
}
