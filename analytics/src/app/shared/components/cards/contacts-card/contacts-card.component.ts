import { Component } from "@angular/core";
import { DataService } from "../../../services/data/data.service";

@Component({
	selector: "contacts-card",
	templateUrl: "./contacts-card.component.html",
	styleUrls: ["./contacts-card.component.scss"]
})
export class ContactsCardComponent {
	listItems;
}
