import { Component, ViewEncapsulation,ElementRef, OnInit, HostBinding } from '@angular/core';
import {GlobalState} from '../app.state';

import { ConfigService } from '../shared/services/config/config.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
	  encapsulation: ViewEncapsulation.Emulated,
})
export class LayoutComponent implements OnInit {

		constructor(public config: ConfigService, private _elementRef: ElementRef, private _state: GlobalState) {

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

}
