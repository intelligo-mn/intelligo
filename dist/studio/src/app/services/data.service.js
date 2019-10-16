"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const material_1 = require("@angular/material");
const router_1 = require("@angular/router");
const environment_1 = require("../../environments/environment");
const data_models_1 = require("../models/data.models");
const info_dialog_service_1 = require("./info-dialog.service");
let DataService = class DataService {
    constructor(http, infoDialog, dialog, router) {
        this.http = http;
        this.infoDialog = infoDialog;
        this.dialog = dialog;
        this.router = router;
        let connJSON = localStorage.getItem("conn");
        if (connJSON)
            this.conn = JSON.parse(connJSON);
    }
    getAnalyticsApiBase() {
        if (!this.conn || !this.conn.ServerUrl)
            return "";
        return this.conn.ServerUrl + "analytics";
    }
    get chatServer() {
        return this.conn;
    }
    isSuperAdmin() {
        if (!this.loggedInUser || !this.loggedInUser.roles)
            return false;
        return (this.loggedInUser.roles.map(x => x.role).indexOf("SUPER_ADMIN") != -1);
    }
    isBizAdmin() {
        if (!this.loggedInUser || !this.loggedInUser.roles)
            return false;
        return (this.loggedInUser.roles.map(x => x.role).indexOf("BUSINESS_ADMIN") != -1);
    }
    isFlowManager() {
        if (!this.loggedInUser || !this.loggedInUser.roles)
            return false;
        return (this.loggedInUser.roles
            .map(x => x.role)
            .indexOf("BUSINESS_FLOW_MANAGER") != -1);
    }
    normalizeBaseUrl(baseUrl) {
        baseUrl = baseUrl.replace(/\\$/, "");
        if (!baseUrl.endsWith("/"))
            baseUrl += "/";
        return baseUrl;
    }
    getHeaders() {
        if (this.loggedInUser && this.loggedInUser.accessToken)
            return new http_1.HttpHeaders({
                "access-token": this.loggedInUser.accessToken
            });
        return new http_1.HttpHeaders();
    }
    setConnection(conn) {
        if (conn && conn.ServerUrl)
            conn.ServerUrl = this.normalizeBaseUrl(conn.ServerUrl);
        localStorage.setItem("conn", JSON.stringify(conn));
        this.conn = conn;
    }
    getRoles() {
        let h = this.getHeaders();
        return this.http.get(`${this.conn.ServerUrl}auth/roles`, {
            headers: h
        });
    }
    getBusinessAccounts(searchText = "", page = 0, size = 10) {
        let h = this.getHeaders();
        return this.http.get(`${this.conn.ServerUrl}business/accounts?searchText=${encodeURIComponent(searchText)}&page=${page}&size=${size}`, { headers: h });
    }
    getBusinessDetails(bizId) {
        let h = this.getHeaders();
        return this.http.get(`${this.conn.ServerUrl}business/accounts/${bizId}`, { headers: h });
    }
    updateBusinessAccountStatus(account, status) {
        let h = this.getHeaders();
        return this.http.put(this.conn.ServerUrl +
            "business/accounts/" +
            account.id +
            "/status/" +
            data_models_1.BusinessAccountStatus[status], { headers: h });
    }
    saveBusinessAccount(account, create) {
        if (create) {
            return this.http.post(this.conn.ServerUrl + "business/accounts", account, { headers: this.getHeaders() });
        }
        else {
            return this.http.put(this.conn.ServerUrl + "business/accounts/" + account.id, account, { headers: this.getHeaders() });
        }
    }
    getChatProjects(businessId, page = 0, size = 10) {
        let h = this.getHeaders();
        return this.http.get(`${this.conn.ServerUrl}business/flows?page=${page}&size=${size}&businessId=${businessId}`, { headers: h });
    }
    createChatProject(chatProject) {
        let h = this.getHeaders();
        return this.http.post(`${this.conn.ServerUrl}business/flows`, chatProject, { headers: h });
    }
    registerOnAnaCloud(request) {
        let h = this.getHeaders();
        let serverUrl = "http://gateway.api.dev.ana.chat/";
        if (environment_1.environment.production) {
            serverUrl = "http://gateway.api.ana.chat/";
        }
        return this.http.post(`${serverUrl}business/accounts/publicRegister`, request, { headers: h });
    }
    saveChatProject(chatProject) {
        let h = this.getHeaders();
        if ((chatProject.flow && Object.keys(chatProject.flow).length <= 0) ||
            chatProject.flow === null) {
            delete chatProject.flow;
        }
        if ((chatProject.source && Object.keys(chatProject.source).length <= 0) ||
            chatProject.source === null) {
            delete chatProject.source;
        }
        return this.http.put(`${this.conn.ServerUrl}business/flows/${chatProject.id}`, chatProject, { headers: h });
    }
    getUsers(bizid, searchText = "", page = 0, size = 10) {
        let h = this.getHeaders();
        return this.http.get(`${this.conn.ServerUrl}auth/users?searchText=${encodeURIComponent(searchText)}&page=${page}&size=${size}&businessId=${bizid}`, { headers: h });
    }
    createUser(user) {
        let h = this.getHeaders();
        return this.http.post(`${this.conn.ServerUrl}auth/users/accounts/register`, user, { headers: h });
    }
    login(username, password) {
        return this.http.post(this.conn.ServerUrl + "auth/login", {
            username: username,
            password: password
        });
    }
    updatePassword(userId, password) {
        let h = this.getHeaders();
        return this.http.put(`${this.conn.ServerUrl}auth/credentials/${userId}`, {
            newPassword: password
        }, { headers: h });
    }
    changeCurrentUserPassword(password, newPassword) {
        let h = this.getHeaders();
        return this.http.put(`${this.conn.ServerUrl}auth/credentials/reset`, {
            newPassword: newPassword,
            password: password
        }, { headers: h });
    }
    checkLogin(data) {
        return this.http.get(this.conn.ServerUrl + "auth/me", {
            headers: { "access-token": data.accessToken }
        });
    }
    logout() {
        localStorage.removeItem("user");
        let h = this.getHeaders();
        delete this.loggedInUser;
        return this.http
            .get(this.conn.ServerUrl + "auth/logout", {
            headers: h
        })
            .subscribe(x => x);
    }
    userLoggedinCheck(callback, hardCheck = false) {
        if (this.conn && this.conn.ServerUrl) {
            let userJSON = localStorage.getItem("user");
            if (userJSON) {
                let user = JSON.parse(userJSON);
                if (user.accessToken && !hardCheck) {
                    this.loggedInUser = user;
                    callback(true);
                    return;
                }
                return;
            }
        }
        callback(false);
    }
    handleError(err, title, message) {
        let body = err.error;
        if (body && body.error) {
            this.handleTypedError(body.error, title, message);
        }
        else
            this.infoDialog.alert(title, message);
    }
    handleTypedError(err, title, message) {
        let msg = err.message || message;
        if (err.errors) {
            err.errors.forEach(x => {
                msg += ` ${x.message}`;
            });
        }
        this.infoDialog.alert(title, msg);
    }
};
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient,
        info_dialog_service_1.InfoDialogService,
        material_1.MatDialog,
        router_1.Router])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map