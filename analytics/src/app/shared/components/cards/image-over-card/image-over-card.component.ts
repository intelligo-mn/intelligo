import { Component, Input } from "@angular/core";

@Component({
	selector: "image-over-card",
	templateUrl: "./image-over-card.component.html",
	styleUrls: ["./image-over-card.component.scss"]
})
export class ImageOverCardComponent {
	@Input("title") title: string;
	@Input("subtitle") subtitle: string;
	@Input("imgPath") imgPath: string;
	@Input("align") align: string;

	constructor() {
		this.title = this.title || "";
		this.subtitle = this.subtitle || "";
		this.imgPath = this.imgPath || "";
		this.align = this.align || "";
	}
}
