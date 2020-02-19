import { Component, Input,Injectable } from "@angular/core";
import { DataService } from "../../../services/data/data.service";

@Component({
	selector: "tabs-over-card",
	templateUrl: "./tabs-over-card.component.html",
	styleUrls: ["./tabs-over-card.component.scss"]
})
export class TabsOverCardComponent {
	@Input("tabColor") tabColor: string;
	getTabsContent: any;
	filtered: any;
/*	constructor(private _DataService: DataService) {
		this.tabColor = this.tabColor || "";
		this._DataService.getTabsOverCard().subscribe(
			res => {
				(this.getTabsContent = res),
				(this.getTabsContent = this.getTabsContent.data),
				(this.filtered = this.getTabsContent[0].details)
	
			},
			error => console.log("error : " + error)
		);
	}*/

}
