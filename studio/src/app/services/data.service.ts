import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InfoDialogService } from './info-dialog.service';
import { ChatServerConnection, ChatBotProject } from '../models/app.models';
import { LoginData, APIResponse, ListContent, BusinessAccount, BusinessAccountStatus, ErrorItem, Role, ListData, UserRegisterModel, User, ChatProject, RegisterOnAnaCloudDetails } from '../models/data.models';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class DataService {

	constructor(
		private http: HttpClient,
		private infoDialog: InfoDialogService,
		private dialog: MatDialog,
		private router: Router) {
		let connJSON = localStorage.getItem("conn");
		if (connJSON)
			this.conn = JSON.parse(connJSON);
	}
	private conn: ChatServerConnection;
	loggedInUser: LoginData;

	getAnalyticsApiBase() {
		if (!this.conn || !this.conn.ServerUrl)
			return "";
		return this.conn.ServerUrl + "analytics";
	}

	get chatServer() {
		return this.conn;
	}

	isSuperAdmin() {
		if (!this.loggedInUser || !this.loggedInUser.roles) return false;
		return this.loggedInUser.roles.map(x => x.role).indexOf("SUPER_ADMIN") != -1;
	}

	isBizAdmin() {
		if (!this.loggedInUser || !this.loggedInUser.roles) return false;
		return this.loggedInUser.roles.map(x => x.role).indexOf("BUSINESS_ADMIN") != -1;
	}

	isFlowManager() {
		if (!this.loggedInUser || !this.loggedInUser.roles) return false;
		return this.loggedInUser.roles.map(x => x.role).indexOf("BUSINESS_FLOW_MANAGER") != -1;
	}

	private normalizeBaseUrl(baseUrl: string) {
		baseUrl = baseUrl.replace(/\\$/, '');//Remove ending \ char if any
		if (!baseUrl.endsWith('/'))
			baseUrl += '/';
		return baseUrl;
	}

	private getHeaders() {
		if (this.loggedInUser && this.loggedInUser.accessToken)
			return new HttpHeaders({
				"access-token": this.loggedInUser.accessToken
			});
		return new HttpHeaders();
	}

	setConnection(conn: ChatServerConnection) {
		if (conn && conn.ServerUrl)
			conn.ServerUrl = this.normalizeBaseUrl(conn.ServerUrl);
		localStorage.setItem("conn", JSON.stringify(conn));
		this.conn = conn;
	}

	getRoles() {
		let h = this.getHeaders();
		return this.http.get(`${this.conn.ServerUrl}auth/roles`, { headers: h })
			.map(x => x as APIResponse<Role[]>);
	}

	getBusinessAccounts(searchText: string = "", page: number = 0, size: number = 10) {
		let h = this.getHeaders();
		return this.http.get(`${this.conn.ServerUrl}business/accounts?searchText=${encodeURIComponent(searchText)}&page=${page}&size=${size}`, { headers: h })
			.map(x => x as APIResponse<ListContent<BusinessAccount>>);
	}

	getBusinessDetails(bizId: string) {
		let h = this.getHeaders();
		return this.http.get(`${this.conn.ServerUrl}business/accounts/${bizId}`, { headers: h })
			.map(x => x as APIResponse<BusinessAccount>);
	}

	updateBusinessAccountStatus(account: BusinessAccount, status: BusinessAccountStatus) {
		let h = this.getHeaders();
		return this.http.put(this.conn.ServerUrl + "business/accounts/" + account.id + "/status/" + BusinessAccountStatus[<number>status], { headers: h })
			.map(x => x as APIResponse<BusinessAccount>);
	}

	saveBusinessAccount(account: BusinessAccount, create: boolean) {
		if (create) {
			return this.http.post(this.conn.ServerUrl + "business/accounts", account,
				{ headers: this.getHeaders() }).map(x => x as APIResponse<BusinessAccount>);
		} else {
			return this.http.put(this.conn.ServerUrl + "business/accounts/" + account.id, account,
				{ headers: this.getHeaders() }).map(x => x as APIResponse<BusinessAccount>);
		}
	}

	getChatProjects(businessId: string, page: number = 0, size: number = 10) {
		let h = this.getHeaders();
		return this.http.get(`${this.conn.ServerUrl}business/flows?page=${page}&size=${size}&businessId=${businessId}`, { headers: h })
			.map(x => x as APIResponse<ListContent<ChatProject>>);
	}

	createChatProject(chatProject: ChatProject) {
		let h = this.getHeaders();

		return this.http.post(`${this.conn.ServerUrl}business/flows`, chatProject, { headers: h })
			.map(x => x as APIResponse<ChatProject>);
	}

	registerOnAnaCloud(request: RegisterOnAnaCloudDetails) {
		let h = this.getHeaders();
		let serverUrl = "http://gateway.api.dev.ana.chat/";
		if (environment.production) {
			serverUrl = "http://gateway.api.ana.chat/";
		}
		return this.http.post(`${serverUrl}business/accounts/publicRegister`, request, { headers: h })
			.map(x => x as APIResponse<RegisterOnAnaCloudDetails>);
	}

	saveChatProject(chatProject: ChatProject) {
		let h = this.getHeaders();

		if ((chatProject.flow && Object.keys(chatProject.flow).length <= 0) || chatProject.flow === null) {
			delete chatProject.flow;
		}
		if ((chatProject.source && Object.keys(chatProject.source).length <= 0) || chatProject.source === null) {
			delete chatProject.source;
		}
		return this.http.put(`${this.conn.ServerUrl}business/flows/${chatProject.id}`, chatProject, { headers: h })
			.map(x => x as APIResponse<ChatProject>);

	}

	getUsers(bizid: string, searchText: string = "", page: number = 0, size: number = 10) {
		let h = this.getHeaders();
		return this.http.get(`${this.conn.ServerUrl}auth/users?searchText=${encodeURIComponent(searchText)}&page=${page}&size=${size}&businessId=${bizid}`, { headers: h })
			.map(x => x as ListContent<User>);
	}

	createUser(user: UserRegisterModel) {
		let h = this.getHeaders();
		return this.http.post(`${this.conn.ServerUrl}auth/users/accounts/register`, user, { headers: h })
			.map(x => x as APIResponse<User>);
	}

	login(username: string, password: string) {
		return this.http.post(this.conn.ServerUrl + "auth/login", {
			"username": username,
			"password": password
		}).map(x => x as APIResponse<LoginData>);
	}

	updatePassword(userId: string, password: string) {
		let h = this.getHeaders();
		return this.http.put(`${this.conn.ServerUrl}auth/credentials/${userId}`, {
			"newPassword": password
		}, { headers: h }).map(x => x as APIResponse<LoginData>);
	}

	changeCurrentUserPassword(password: string, newPassword: string) {
		let h = this.getHeaders();
		return this.http.put(`${this.conn.ServerUrl}auth/credentials/reset`, {
			"newPassword": newPassword,
			"password": password
		}, { headers: h }).map(x => x as APIResponse<LoginData>);
	}

	checkLogin(data: LoginData) {
		return this.http.get(this.conn.ServerUrl + "auth/me", {
			headers: { "access-token": data.accessToken }
		}).map(x => x as APIResponse<LoginData>);
	}

	logout() {
		localStorage.removeItem("user");
		let h = this.getHeaders();
		delete this.loggedInUser;
		return this.http.get(this.conn.ServerUrl + "auth/logout", {
			headers: h
		}).map(x => x);
	}

	userLoggedinCheck(callback: (loggedin: boolean) => void, hardCheck: boolean = false) {
		if (this.conn && this.conn.ServerUrl) {
			let userJSON = localStorage.getItem("user");
			if (userJSON) {
				let user = JSON.parse(userJSON) as LoginData;
				if (user.accessToken && !hardCheck) {
					this.loggedInUser = user;
					callback(true);
					return;
				}
				this.checkLogin(user).subscribe(x => {
					if (x.success) {
						this.loggedInUser = user;
						callback(true);
					} else {
						callback(false);
					}
				}, err => {
					callback(false);
				});
				return;
			}
		}
		callback(false);
	}

	handleError(err: any, title: string, message: string) {
		let body = err.error;
		if (body && body.error) {
			this.handleTypedError(body.error, title, message);
		} else
			this.infoDialog.alert(title, message);
	}

	handleTypedError(err: ErrorItem, title: string, message: string) {
		let msg = err.message || message;
		if (err.errors) {
			err.errors.forEach(x => {
				msg += ` ${x.message}`
			});
		}
		this.infoDialog.alert(title, msg);
	}
}