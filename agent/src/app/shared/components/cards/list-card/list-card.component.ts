import { Component, Input } from "@angular/core";
import { DataService } from "../../../services/data/data.service";

@Component({
	selector: "list-card",
	templateUrl: "./list-card.component.html",
	styleUrls: ["./list-card.component.scss"]
})
export class ListCardComponent {
	listItems;

	// constructor(private _DataService: DataService) {
	// 	this._DataService.getListCardDemo().subscribe(
	// 		res => {
	// 			(this.listItems = res),
	// 			(this.listItems = this.listItems.data)
	// 		},
	// 		error => console.log("error : " + error)
	// 	);
	// }
}
