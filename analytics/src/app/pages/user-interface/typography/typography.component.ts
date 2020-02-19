import {
	Component,
	OnInit,
	trigger,
	state,
	style,
	transition,
	animate,
	ElementRef,
	HostListener,
	HostBinding
} from "@angular/core";
import { GlobalState } from "../../../app.state";
import { ConfigService } from "../../../shared/services/config/config.service";

@Component({
	selector: ".content_inner_wrapper",
	templateUrl: "./typography.component.html",
	styleUrls: ["./typography.component.scss"]
})
export class TypographyComponent implements OnInit {
	//Header Title
	title: string = "Typography";
	constructor(
		public config: ConfigService,
		private _elementRef: ElementRef,
		private _state: GlobalState
	) {}

	ngOnInit() {}
}
