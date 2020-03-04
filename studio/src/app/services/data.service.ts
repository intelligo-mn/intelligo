import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ChatServerConnection } from '../models/app.models';
import {
  APIResponse,
  BusinessAccount,
  BusinessAccountStatus,
  ChatProject,
  ErrorItem,
  ListContent,
  LoginData,
  RegisterOnIntelligoCloudDetails,
  Role,
  User,
  UserRegisterModel,
} from '../models/data.models';
import { InfoDialogService } from './info-dialog.service';

@Injectable()
export class DataService {
  constructor(
    private http: HttpClient,
    private infoDialog: InfoDialogService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    let connJSON = localStorage.getItem('conn');
    if (connJSON) this.conn = JSON.parse(connJSON);
  }
  private conn: ChatServerConnection;
  loggedInUser: LoginData;

  getAnalyticsApiBase() {
    if (!this.conn || !this.conn.ServerUrl) return '';
    return this.conn.ServerUrl + 'analytics';
  }

  get chatServer() {
    return this.conn;
  }

  isSuperAdmin() {
    if (!this.loggedInUser || !this.loggedInUser.roles) return false;
    return (
      this.loggedInUser.roles.map(x => x.role).indexOf('SUPER_ADMIN') != -1
    );
  }

  isBizAdmin() {
    if (!this.loggedInUser || !this.loggedInUser.roles) return false;
    return (
      this.loggedInUser.roles.map(x => x.role).indexOf('BUSINESS_ADMIN') != -1
    );
  }

  isFlowManager() {
    if (!this.loggedInUser || !this.loggedInUser.roles) return false;
    return (
      this.loggedInUser.roles
        .map(x => x.role)
        .indexOf('BUSINESS_FLOW_MANAGER') != -1
    );
  }

  private normalizeBaseUrl(baseUrl: string) {
    baseUrl = baseUrl.replace(/\\$/, ''); //Remove ending \ char if any
    if (!baseUrl.endsWith('/')) baseUrl += '/';
    return baseUrl;
  }

  private getHeaders() {
    if (this.loggedInUser && this.loggedInUser.accessToken)
      return new HttpHeaders({
        'access-token': this.loggedInUser.accessToken,
      });
    return new HttpHeaders();
  }

  setConnection(conn: ChatServerConnection) {
    if (conn && conn.ServerUrl)
      conn.ServerUrl = this.normalizeBaseUrl(conn.ServerUrl);
    localStorage.setItem('conn', JSON.stringify(conn));
    this.conn = conn;
  }

  getRoles(): Observable<APIResponse<Role[]>> {
    let h = this.getHeaders();
    return this.http.get<any>(`${this.conn.ServerUrl}auth/roles`, {
      headers: h,
    });
  }

  getBusinessAccounts(
    searchText: string = '',
    page: number = 0,
    size: number = 10,
  ): Observable<APIResponse<ListContent<BusinessAccount>>> {
    let h = this.getHeaders();
    return this.http.get<any>(
      `${this.conn.ServerUrl}business/accounts?searchText=${encodeURIComponent(
        searchText,
      )}&page=${page}&size=${size}`,
      { headers: h },
    );
  }

  getBusinessDetails(bizId: string): Observable<APIResponse<BusinessAccount>> {
    let h = this.getHeaders();
    return this.http.get<any>(
      `${this.conn.ServerUrl}business/accounts/${bizId}`,
      { headers: h },
    );
  }

  updateBusinessAccountStatus(
    account: BusinessAccount,
    status: BusinessAccountStatus,
  ): Observable<APIResponse<BusinessAccount>> {
    let h = this.getHeaders();
    return this.http.put<any>(
      this.conn.ServerUrl +
        'business/accounts/' +
        account.id +
        '/status/' +
        BusinessAccountStatus[<number>status],
      { headers: h },
    );
  }

  saveBusinessAccount(
    account: BusinessAccount,
    create: boolean,
  ): Observable<APIResponse<BusinessAccount>> {
    if (create) {
      return this.http.post<any>(
        this.conn.ServerUrl + 'business/accounts',
        account,
        { headers: this.getHeaders() },
      );
    } else {
      return this.http.put<any>(
        this.conn.ServerUrl + 'business/accounts/' + account.id,
        account,
        { headers: this.getHeaders() },
      );
    }
  }

  getChatProjects(
    businessId: string,
    page: number = 0,
    size: number = 10,
  ): Observable<APIResponse<ListContent<ChatProject>>> {
    let h = this.getHeaders();
    return this.http.get<any>(
      `${this.conn.ServerUrl}business/flows?page=${page}&size=${size}&businessId=${businessId}`,
      { headers: h },
    );
  }

  createChatProject(
    chatProject: ChatProject,
  ): Observable<APIResponse<ChatProject>> {
    let h = this.getHeaders();

    return this.http.post<any>(
      `${this.conn.ServerUrl}business/flows`,
      chatProject,
      { headers: h },
    );
  }

  registerOnAnaCloud(
    request: RegisterOnIntelligoCloudDetails,
  ): Observable<APIResponse<RegisterOnIntelligoCloudDetails>> {
    let h = this.getHeaders();
    let serverUrl = 'http://gateway.api.dev.ana.chat/';
    if (environment.production) {
      serverUrl = 'http://gateway.api.ana.chat/';
    }
    return this.http.post<any>(
      `${serverUrl}business/accounts/publicRegister`,
      request,
      { headers: h },
    );
  }

  saveChatProject(
    chatProject: ChatProject,
  ): Observable<APIResponse<ChatProject>> {
    let h = this.getHeaders();

    if (
      (chatProject.flow && Object.keys(chatProject.flow).length <= 0) ||
      chatProject.flow === null
    ) {
      delete chatProject.flow;
    }
    if (
      (chatProject.source && Object.keys(chatProject.source).length <= 0) ||
      chatProject.source === null
    ) {
      delete chatProject.source;
    }
    return this.http.put<any>(
      `${this.conn.ServerUrl}business/flows/${chatProject.id}`,
      chatProject,
      { headers: h },
    );
  }

  getUsers(
    bizid: string,
    searchText: string = '',
    page: number = 0,
    size: number = 10,
  ): Observable<ListContent<User>> {
    let h = this.getHeaders();
    return this.http.get<any>(
      `${this.conn.ServerUrl}auth/users?searchText=${encodeURIComponent(
        searchText,
      )}&page=${page}&size=${size}&businessId=${bizid}`,
      { headers: h },
    );
  }

  createUser(user: UserRegisterModel): Observable<APIResponse<User>> {
    let h = this.getHeaders();
    return this.http.post<any>(
      `${this.conn.ServerUrl}auth/users/accounts/register`,
      user,
      { headers: h },
    );
  }

  login(
    username: string,
    password: string,
  ): Observable<APIResponse<LoginData>> {
    return this.http.post<any>(this.conn.ServerUrl + 'auth/login', {
      username: username,
      password: password,
    });
  }

  updatePassword(
    userId: string,
    password: string,
  ): Observable<APIResponse<LoginData>> {
    let h = this.getHeaders();
    return this.http.put<any>(
      `${this.conn.ServerUrl}auth/credentials/${userId}`,
      {
        newPassword: password,
      },
      { headers: h },
    );
  }

  changeCurrentUserPassword(
    password: string,
    newPassword: string,
  ): Observable<APIResponse<LoginData>> {
    let h = this.getHeaders();
    return this.http.put<any>(
      `${this.conn.ServerUrl}auth/credentials/reset`,
      {
        newPassword: newPassword,
        password: password,
      },
      { headers: h },
    );
  }

  checkLogin(data: LoginData): Observable<APIResponse<LoginData>> {
    return this.http.get<any>(this.conn.ServerUrl + 'auth/me', {
      headers: { 'access-token': data.accessToken },
    });
  }

  logout() {
    localStorage.removeItem('user');
    let h = this.getHeaders();
    delete this.loggedInUser;
    return this.http
      .get(this.conn.ServerUrl + 'auth/logout', {
        headers: h,
      })
      .subscribe(x => x);
  }

  userLoggedinCheck(
    callback: (loggedin: boolean) => void,
    hardCheck: boolean = false,
  ) {
    if (this.conn && this.conn.ServerUrl) {
      let userJSON = localStorage.getItem('user');
      if (userJSON) {
        let user = JSON.parse(userJSON) as LoginData;
        if (user.accessToken && !hardCheck) {
          this.loggedInUser = user;
          callback(true);
          return;
        }
        // this.checkLogin(user)(x => {
        // 	if (x.success) {
        // 		this.loggedInUser = user;
        // 		callback(true);
        // 	} else {
        // 		callback(false);
        // 	}
        // }, err => {
        // 	callback(false);
        // });
        return;
      }
    }
    callback(false);
  }

  handleError(err: any, title: string, message: string) {
    let body = err.error;
    if (body && body.error) {
      this.handleTypedError(body.error, title, message);
    } else this.infoDialog.alert(title, message);
  }

  handleTypedError(err: ErrorItem, title: string, message: string) {
    let msg = err.message || message;
    if (err.errors) {
      err.errors.forEach(x => {
        msg += ` ${x.message}`;
      });
    }
    this.infoDialog.alert(title, msg);
  }
}
