import { Component, Input } from "@angular/core";

@Component({
	selector: "image-card",
	templateUrl: "./image-card.component.html",
	styleUrls: ["./image-card.component.scss"]
})
export class ImageCardComponent {
	@Input("title") title: string;
	@Input("imgPath") imgPath: string;

	constructor() {
		this.title = this.title || "";
		this.imgPath = this.imgPath || "";
	}
}
