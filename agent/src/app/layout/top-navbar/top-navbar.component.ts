import {Component, OnInit, trigger, state, style, transition, animate, ElementRef, HostListener, ViewEncapsulation, ViewChild} from "@angular/core";
import { GlobalState } from "../../app.state";
import { ConfigService } from "../../shared/services/config/config.service";
import { ThemesService } from '../../shared/services/themes/themes.service';

@Component({
  selector: "app-header",
  templateUrl: "./top-navbar.component.html",
  styleUrls: ["./top-navbar.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class TopNavbarComponent implements OnInit {

  currentTheme: any ;
	
  constructor(public config: ConfigService, private _elementRef: ElementRef, private _state: GlobalState, public themes: ThemesService) {
		this._state.subscribe("app.isCollapsed", isCollapsed => {
			this.config.appLayout.isApp_SidebarLeftCollapsed = isCollapsed;
		});
	  this._state.subscribe('app.isApp_MobileSidebarLeftOpen', (isApp_MobileSidebarLeftOpen) => {
      this.config.appLayout.isApp_MobileSidebarLeftOpen = isApp_MobileSidebarLeftOpen;
    });
    this._state.subscribe('app.isApp_BackdropVisible', (isApp_BackdropVisible) => {
      this.config.appLayout.isApp_BackdropVisible = isApp_BackdropVisible;
    });
    this._state.subscribe('app.isApp_SidebarRightOpen', (isApp_SidebarRightOpen) => {
      this.config.appLayout.isApp_SidebarRightOpen = isApp_SidebarRightOpen;
    });
  }

  ngOnInit() {
  }

	setTheme() {
			this.themes.setTheme(this.currentTheme);
	}
	toggleProfile(){
		this.config.profile.isProfileVisible = !this.config.profile.isProfileVisible;
		this._state.notifyDataChanged("profile.isProfileVisible", this.config.profile.isProfileVisible);
		return false;
	}
	toggleMenuSideabar() {
		this.config.appLayout.isApp_SidebarLeftCollapsed = !this.config.appLayout.isApp_SidebarLeftCollapsed;
		this._state.notifyDataChanged("app.isCollapsed", this.config.appLayout.isApp_SidebarLeftCollapsed);
		return false;
	}
  toggleAppMobileLeftMenuSidebar() {
    this.config.appLayout.isApp_MobileSidebarLeftOpen = !this.config.appLayout.isApp_MobileSidebarLeftOpen;
				this.config.appLayout.isApp_BackdropVisible = !this.config.appLayout.isApp_BackdropVisible;
				this._state.notifyDataChanged('app.isApp_MobileSidebarLeftOpen', this.config.appLayout.isApp_MobileSidebarLeftOpen);
				this._state.notifyDataChanged('app.isApp_BackdropVisible', this.config.appLayout.isApp_BackdropVisible);
				return false;
  }


  toggleAppRightSidebar() {
    this.config.appLayout.isApp_SidebarRightOpen = !this.config.appLayout.isApp_SidebarRightOpen;
    this.config.appLayout.isApp_BackdropVisible = !this.config.appLayout.isApp_BackdropVisible;
    this._state.notifyDataChanged('app.isApp_SidebarRightOpen', this.config.appLayout.isApp_SidebarRightOpen);
    this._state.notifyDataChanged('app.isApp_BackdropVisible', this.config.appLayout.isApp_BackdropVisible);
    return false;
  }
}
