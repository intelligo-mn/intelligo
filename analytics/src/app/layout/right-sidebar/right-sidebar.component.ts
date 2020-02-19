import { Component, ViewEncapsulation } from "@angular/core";

import { ConfigService } from "../../shared/services/config/config.service";

@Component({
	selector: "app-offsidebar",
	templateUrl: "./right-sidebar.component.html",
	styleUrls: ["./right-sidebar.component.scss"],
	encapsulation: ViewEncapsulation.Emulated
})
export class RightSidebarComponent {}
