import {
	Component,
	OnInit
} from "@angular/core";
import { LoginResponse, DataService } from "../../../shared/services/data/data.service"
//import { Http } from "@angular/Http"
import { ConfigService, UserProfile } from "../../../shared/services/config/config.service";
import { InfoDialogService } from '../../../shared/services/helpers/info-dialog.service';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
@Component({
	selector: ".content_inner_wrapper",
	templateUrl: "./login.component.html",
	styleUrls: [
		"./login.component.scss",
		"./login.component.css"
	]
})

export class LoginComponent implements OnInit {

	public username: string;
	public password: string;
	public socketEndpoint: string;
	public apiGatewayEndpoint: string;
	
	constructor(public router: Router, private config: ConfigService, private data: DataService, private infoDialog: InfoDialogService) {
		let serverConfig = localStorage.getItem('serverConfig');
		if (serverConfig) {
			this.config.app = JSON.parse(serverConfig) as any;
			this.socketEndpoint = this.config.app.webSocketEndPoint;
			this.apiGatewayEndpoint = this.config.app.apiGatewayEndPoint;
		}
	}

	signIn() {
		if (!this.socketEndpoint || !this.apiGatewayEndpoint) {
			this.infoDialog.alert('Incomplete Information', 'Please enter the Socket Endpoint and API Gateway Endpoint details. These details will be provided by your IT Administrator');
			return;
		}

		this.config.app.apiGatewayEndPoint = this.apiGatewayEndpoint;
		this.config.app.webSocketEndPoint = this.socketEndpoint;
		localStorage.setItem('serverConfig', JSON.stringify(this.config.app));

		this.data.login(this.username, this.password).subscribe(resData => {
			if (resData.error)
				this.infoDialog.alert('Unable to login', resData.error.message);
			else {
				let userProfile = this.config.getUserProfileFromLoginDetails(resData.data);
				if (userProfile.accessToken) {
					this.config.profile = userProfile;
					localStorage.setItem("profile", JSON.stringify(this.config.profile));
					this.router.navigate(['/chat']);
				}
				else
					this.router.navigate(['/']);
			}
		}, err => {
			try {
				let resp = JSON.parse(err._body);
				if (resp.error.message)
					this.infoDialog.alert('Unable to login', resp.error.message);
			} catch (e) {
				this.infoDialog.alert(`Oops! Something went wrong!`, err.statusText);
			}
		})
	}

	ngOnInit() {
		let savedProfile = JSON.parse(localStorage.getItem("profile")) as UserProfile;
		if (savedProfile && savedProfile.accessToken) {
			this.data.isAccessTokenValid(savedProfile.accessToken).subscribe(resp => {
				if (resp.error) {
					this.data.logout();
					this.router.navigateByUrl('/');
				}
				else {
					this.config.profile = savedProfile;
					this.router.navigateByUrl('/chat');
				}
			}, err => {
				if (err.status == 401) {
					this.data.logout();
					this.router.navigateByUrl('/');
				} else
					this.infoDialog.alert(`Unexpected error occured!`, err.message);
			});
		}
	}
}
