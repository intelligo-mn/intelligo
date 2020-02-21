import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "gallery-card",
	templateUrl: "./gallery-card.component.html",
	styleUrls: ["./gallery-card.component.scss"]
})
export class GalleryCardComponent implements OnInit {
	@Input("title") title: string;
	@Input() images: any[];

	constructor() {}
	ngOnInit() {
		this.title = this.title || "";
		//this.images = this.images || [];
	}
}
