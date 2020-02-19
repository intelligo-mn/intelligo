import {
	Component,
	ViewEncapsulation,
	OnInit,
	trigger,
	state,
	style,
	transition,
	animate,
	ElementRef,
	HostListener
} from "@angular/core";
import { GlobalState } from "../../app.state";
import { ConfigService } from "../../shared/services/config/config.service";
import { DataService } from "../../shared/services/data/data.service"
import {
	AnalyticsComponent
} from "../../pages/analytics/analytics.component"

@Component({
	selector: "app-sidebar",
	templateUrl: "./left-sidebar.component.html",
	styleUrls: ["./left-sidebar.component.scss"]
})
export class LeftSidebarComponent implements OnInit {
	public checkApi: boolean = false
	public goalData = {}
	public scrollbarOptions = {
		axis: "y",
		theme: "minimal",
		scrollInertia: 0,
		mouseWheel: { preventDefault: true }
	};

	constructor(public config: ConfigService, private _elementRef: ElementRef, private _state: GlobalState, private _data: DataService
	) {

	}
	ngOnInit() {

	}
	toggleMenuSideabar() {
		this.config.appLayout.isApp_SidebarLeftCollapsed = !this.config.appLayout.isApp_SidebarLeftCollapsed;
		this._state.notifyDataChanged("app.isCollapsed", this.config.appLayout.isApp_SidebarLeftCollapsed);
		//let analytics=new AnalyticsComponent(this._data);
		//analytics.refresh();
		return false;
	}

	@HostListener("window:resize")
	public onWindowResize(): void { }
}
