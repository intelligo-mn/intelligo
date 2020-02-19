import { Component } from "@angular/core";
import { TooltipPosition } from "@angular/material";
import { GlobalState } from "../../../app.state";
import { ConfigService } from "../../../shared/services/config/config.service";

@Component({
	selector: ".content_inner_wrapper",
	templateUrl: "./tooltips-popovers.component.html",
	styleUrls: ["./tooltips-popovers.component.scss"]
})
export class TooltipsPopoversComponent {
	position: TooltipPosition = "below";
	message: string = "Here is the tooltip";
	disabled = false;
	showDelay = 0;
	hideDelay = 1000;
	showExtraClass = false;
}
