import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { GlobalState } from '../../../app.state';
import { ConfigService } from '../../services/config/config.service';
import { DataService } from "../../services/data/data.service";
import { RouterModule, Routes } from '@angular/router';
@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class Profile implements OnInit {
	isProfileVisible: boolean = true;
	isProfileSubmenuVisible: boolean = false;
	profile: any;
	
	/*constructor(public config: ConfigService, private _state: GlobalState, private _DataService: DataService) {
		this._DataService.getProfile().subscribe(
			res => {
				(this.profile = res),
				(this.profile = this.profile.data)
			},
			error => console.log("error : " + error)
		);
		this._state.subscribe("profile.isProfileVisible", isProfileVisible => {
			this.isProfileVisible = this.config.profile.isProfileVisible;
		});
	}*/
	ngOnInit() {}
}
