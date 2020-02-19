import {
	Component
} from "@angular/core";


@Component({
	selector: ".content_inner_wrapper",
	templateUrl: "./collapsible.component.html",
	styleUrls: ["./collapsible.component.scss"]
})
export class CollapsibleComponent {
	displayMode: string = "default";
	multi: boolean = false;
	hideToggle: boolean = false;
	showPanel3 = true;
}
