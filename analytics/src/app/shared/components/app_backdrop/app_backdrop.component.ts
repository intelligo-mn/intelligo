import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import {GlobalState} from '../../../app.state';
import { ConfigService } from '../../services/config/config.service';

@Component({
  selector: 'appBackdrop',
  templateUrl: './app_backdrop.component.html',
  styleUrls: ['./app_backdrop.component.scss']
})
export class AppBackdropComponent implements OnInit {
  isApp_BackdropVisible: boolean = false;

  constructor(public config: ConfigService, private _state: GlobalState) {
    this._state.subscribe('app.isApp_BackdropVisible', (isApp_BackdropVisible) => {
      this.isApp_BackdropVisible = this.config.appLayout.isApp_BackdropVisible;
    });

  }
  ngOnInit() {

  }

  appBackdropClose() {
    this.config.appLayout.isApp_BackdropVisible = false;
    this._state.notifyDataChanged('app.isApp_BackdropVisible', this.config.appLayout.isApp_BackdropVisible);

    if (this.config.appLayout.isApp_BackdropVisible === false) {
      this.config.appLayout.isApp_MobileSidebarLeftOpen = false;
      this._state.notifyDataChanged('app.isApp_MobileSidebarLeftOpen', this.config.appLayout.isApp_MobileSidebarLeftOpen);
      this.config.appLayout.isApp_SidebarRightOpen = false;
      this._state.notifyDataChanged('app.isApp_SidebarRightOpen', this.config.appLayout.isApp_SidebarRightOpen);
    }

  }

}
