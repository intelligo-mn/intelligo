import { Component, OnInit } from "@angular/core"
import { DataService } from "../../shared/services/data/data.service"
import { OnChanges } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
    selector: 'agent-analytics',
    templateUrl: './agentAnalytics.component.html',
    styleUrls: ['./agentAnalytics.component.scss']
})

export class AgentAnalyticsComponent implements OnInit {
    errorMsg: boolean;
    apiData = [];

    hideChart1 = false;
    hideChart2 = false;
    xlabel = ""
    ylabel = ""
    chatSessionData = []
    agentNames = [];
    loading = true;
    loading1 = true;
    dates = [];
    dataLoading = false
    numberOfChatSessions = [];
    chatSessionsData = [{
        data: this.numberOfChatSessions,
        label: "Number Of Chat Sessions",
        backgroundColor: "#ffb900"
    }]
    agentData = [{
        data: [],
        label: "Number of chat sessions",
        backgroundColor: "#ffb900"
    }]
    constructor(private _data: DataService) {

    }
    ngOnInit() {
        if (localStorage.getItem('numberOfChatSessions')) {
            this.chatSessionData = JSON.parse(localStorage.getItem('numberOfChatSessions'))
            //localStorage.setItem('ChatSessionsData',JSON.stringify(this.chatSessionData))
            for (let i = 0; i < this.chatSessionData.length; i++) {
                this.dates.push(this.chatSessionData[i].date.substring(0, 10))
                this.numberOfChatSessions.push(this.chatSessionData[i].numberOfSessions)
            }
            this.hideChart1 = true;
            this.xlabel = "Date";
            this.ylabel = "Number Of Chats"
            this.chatSessionsData = [{
                data: this.numberOfChatSessions,
                label: "Number Of Chat Sessions",
                backgroundColor: "#ffb900"
            }]
            this.dataLoading = true;
            this.loading = false;
        }
        this.chatSessionsApiCall()
        
        if (localStorage.getItem('agentData')) {
            this.apiData = JSON.parse(localStorage.getItem('agentData'))
            let numberOfChatSessions = [];
            if (this.apiData) {
                for (let i = 0; i < this.apiData.length; i++) {
                    numberOfChatSessions.push(this.apiData[i].numberOfChatSessions)
                    this.agentNames.push(this.apiData[i].agentName)
                }
                this.hideChart2 = true;
                this.agentData = [{
                    data: numberOfChatSessions,
                    label: "Number of chat sessions",
                    backgroundColor: "#ffb900"
                }]
            }
        }
            this.agentDataApiCall()
    }


    chatSessionsApiCall()
    {
        this._data.getNumberOfChatSessions().subscribe(resData => {
            if (resData == null || Object.keys(resData).length == 0 || resData.length == 0) {
                this.errorMsg = false
            }
            
            else {
                localStorage.setItem('chatSessionsData',JSON.stringify(resData))
                this.errorMsg = true
                this.chatSessionData = resData
                for (let i = 0; i < this.chatSessionData.length; i++) {
                    this.dates.push(this.chatSessionData[i].date.substring(0, 10))
                    this.numberOfChatSessions.push(this.chatSessionData[i].numberOfSessions)
                }
                this.hideChart1 = true;
                this.xlabel = "Date";
                this.ylabel = "Number Of Chats"
                this.chatSessionsData = [{
                    data: this.numberOfChatSessions,
                    label: "Number Of Chat Sessions",
                    backgroundColor: "#ffb900"
                }]
                this.xlabel = "Date"
                this.ylabel = "Number Of Chats"
            }
            this.loading = false;

        },error => {
            if (localStorage.getItem('chatSessionsData')) {
                this.loading = false
                this.chatSessionData = JSON.parse(localStorage.getItem('chatSessionsData'))
                for (let i = 0; i < this.chatSessionData.length; i++) {
                    this.dates.push(this.chatSessionData[i].date.substring(0, 10))
                    this.numberOfChatSessions.push(this.chatSessionData[i].numberOfSessions)
                }
                this.hideChart1 = true;
                this.xlabel = "Date";
                this.ylabel = "Number Of Chats"
                this.chatSessionsData = [{
                    data: this.numberOfChatSessions,
                    label: "Number Of Chat Sessions",
                    backgroundColor: "#ffb900"
                }]
                this.errorMsg = true
            }
            else {
                this.loading = false
                this.errorMsg = false
            }

        })

    }


    agentDataApiCall()
    {
        this._data.getNumberOfUsersAndChatSessions().subscribe(resDataNew => {
            localStorage.setItem('agentApiData',JSON.stringify(resDataNew))
            this.apiData = resDataNew
            let numberOfChatSessions = [];
            this.agentNames = [];
            
            
            for (let i = 0; i < this.apiData.length; i++) {
                numberOfChatSessions.push(this.apiData[i].numberOfChatSessions)
                this.agentNames.push(this.apiData[i].agentName)
            }
            this.hideChart2 = true;
            this.loading1 = false;
            this.agentData = [{
                data: numberOfChatSessions,
                label: "Number of chat sessions",
                backgroundColor: "#ffb900"
            }]
           // localStorage.setItem('agentData', JSON.stringify(resDataNew))
        }, error => {
            if (localStorage.getItem('agentApiData')) {
                this.apiData = JSON.parse(localStorage.getItem('agentApiData'))
                let numberOfChatSessions = [];
                this.agentNames = [];
                for (let i = 0; i < this.apiData.length; i++) {
                    numberOfChatSessions.push(this.apiData[i].numberOfChatSessions)
                    this.agentNames.push(this.apiData[i].agentName)
                }
                this.hideChart2 = true;
                this.loading1 = false;
                this.agentData = [{
                    data: numberOfChatSessions,
                    label: "Number of chat sessions",
                    backgroundColor: "#ffb900"
                }]
            }
            else {
                this.hideChart2 = false;
                this.loading1 = false;
            }
        })
    }

    refresh1() {
        this.loading = true;
        this.dates = [];
        this.numberOfChatSessions = []
        this.chatSessionsApiCall()
    }

    refresh2() {
        this.loading1 = true;
        this.agentDataApiCall()
    }



}
