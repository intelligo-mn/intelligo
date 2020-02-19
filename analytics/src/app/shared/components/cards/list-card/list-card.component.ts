import { Component, Input } from "@angular/core";
import { DataService } from "../../../services/data/data.service";

@Component({
	selector: "list-card",
	templateUrl: "./list-card.component.html",
	styleUrls: ["./list-card.component.scss"]
})
export class ListCardComponent {
	listItems;


}
