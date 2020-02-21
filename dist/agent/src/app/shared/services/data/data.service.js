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
const http_1 = require("@angular/http");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const config_service_1 = require("../config/config.service");
require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/catch");
let DataService = class DataService {
    constructor(http, config, router) {
        this.http = http;
        this.config = config;
        this.router = router;
    }
    getHeaders() {
        let headers = new http_1.Headers();
        if (this.config.profile.accessToken)
            headers.set('access-token', this.config.profile.accessToken);
        return headers;
    }
    getChatDetails(page, size, search, businessId, historySize = 5) {
        let url = this.config.app.webSocketEndPoint + `/api/chats`;
        let params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("size", size.toString());
        params.append("historySize", historySize.toString());
        if (businessId)
            params.append("businessId", businessId);
        if (search)
            params.append("searchText", search);
        return this.http.get(this.config.app.webSocketEndPoint + `/api/chats?` + params, { headers: this.getHeaders() })
            .map(res => res.json());
    }
    ;
    intentToHandover(sessionId) {
        let req = {
            handoverToBot: true
        };
        return this.http.post(this.config.app.webSocketEndPoint + `/api/chats/sessions/${sessionId}/dispositions`, req, { headers: this.getHeaders() })
            .map(res => res.json());
    }
    ;
    handover(sessionId, message) {
        let req = {
            handoverToBot: false,
            message: message
        };
        return this.http.post(this.config.app.webSocketEndPoint + `/api/chats/sessions/${sessionId}/dispositions`, req, { headers: this.getHeaders() })
            .map(res => res.json());
    }
    ;
    getHistory(customerId, businessId, pageSize, pageNumber, timeStamp, flowId) {
        let myparams = new URLSearchParams();
        myparams.append("userId", customerId);
        myparams.append("businessId", businessId);
        if (flowId) {
            myparams.append("flowId", flowId);
        }
        myparams.append("size", pageSize);
        if (timeStamp)
            myparams.append("lastMessageTimeStamp", timeStamp.toString());
        else
            myparams.append("page", pageNumber);
        this.baseURL = this.config.app.apiGatewayEndPoint;
        return this.http.get(this.baseURL + "/chatdata/messages?" + myparams, { headers: this.getHeaders() })
            .map((res) => res.json());
    }
    ;
    login(username, password) {
        return this.http.post(this.config.app.apiGatewayEndPoint + "/auth/login", {
            username: username,
            password: password
        }).map(res => res.json());
    }
    isAccessTokenValid(accessToken) {
        return this.http.get(this.config.app.apiGatewayEndPoint + "/auth/me", {
            headers: new http_1.Headers({
                "access-token": accessToken
            })
        }).map(res => res.json());
    }
    logout() {
        try {
            this.http.get(this.config.app.apiGatewayEndPoint + "/auth/logout", { headers: this.getHeaders() }).subscribe(x => {
                console.log('Logout Done: ' + x.text());
            });
        }
        catch (e) {
            console.log('Logout Error');
            console.log(e);
        }
        localStorage.removeItem("profile");
    }
    returnToHome() {
        this.router.navigateByUrl('/');
    }
};
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, config_service_1.ConfigService, router_1.Router])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map