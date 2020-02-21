import { Component } from "@angular/core";
import { DataService } from "../../../services/data/data.service";

@Component({
	selector: "contacts-card",
	templateUrl: "./contacts-card.component.html",
	styleUrls: ["./contacts-card.component.scss"]
})
export class ContactsCardComponent {
	listItems;

	// constructor(private _DataService: DataService) {

	// 	this._DataService.getContactsCardDemo().subscribe(
	// 		res => {
	// 			(this.listItems = res),
	// 			(this.listItems = this.listItems.data)
	// 		},
	// 		error => console.log("error : " + error)
	// 	);
	// }
}
