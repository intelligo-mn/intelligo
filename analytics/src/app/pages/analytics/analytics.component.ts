import {
    Component,
    ViewEncapsulation,
    OnInit,
} from "@angular/core";
import { DataService } from "../../shared/services/data/data.service"

@Component({
    selector: "analytics",
    templateUrl: "./analytics.component.html",
    styleUrls: ["./analytics.component.scss"],
    encapsulation: ViewEncapsulation.Emulated
})
export class AnalyticsComponent implements OnInit {
    endDateStr: string;
    startDateStr: string;
    errorMsg: boolean = true;
    chosenStartDate: Date
    chosenEndDate: Date
    loading = true;
    data_new = [];
    nameData: string[] = [];
    nodeId: string[] = [];
    numberOfUsers: number[] = [];
    numberOfSessions: number[] = [];
    numberOfClicks: number[] = [];
    avgTimeSpent: any[] = [];
    numberOfViews: number[] = [];
    trimNameUser: string[] = [];
    trimNameSession: string[] = [];
    trimNameView: string[] = [];
    trimNameClick: string[] = [];
    hideChart: boolean = false;
    usersLabel: string = "Number Of Users";
    sessionsLabel: string = "Number Of Sessions";
    viewsLabel: string = "Number Of Views";
    clicksLabel: string = "Number Of Clicks";
    usersData = [{
        data: this.numberOfUsers,
        label: this.usersLabel,
        type: "line",
        fill: false,
        pointRadius: 6,
        pointHoverRadius: 8
    }, {
        data: this.numberOfViews,
        label: this.viewsLabel,
        backgroundColor: "#ffb900"
    }]
    usersDataNew = [{
        data: this.numberOfClicks,
        label: this.clicksLabel,
        type: "line",
        fill: false,
        pointRadius: 6,
        pointHoverRadius: 8
    }, {
        data: this.numberOfUsers,
        label: this.usersLabel,
        backgroundColor: "#ffb900"
    }]


    constructor(private _data: DataService) {
    }

    getInitialDate() {
        let startDate = new Date()
        let endDate = new Date()
        startDate.setMonth(startDate.getMonth() - 1 == -1 ? 12 : startDate.getMonth() - 1)
        let tempEndDate = new Date(endDate);
        tempEndDate.setDate(tempEndDate.getDate() + 1);
        this.endDateStr = tempEndDate.getFullYear() + "-" + ((tempEndDate.getMonth() + 1) < 10 ? ('0' + (tempEndDate.getMonth() + 1)) : tempEndDate.getMonth() + 1) + "-" + (tempEndDate.getDate() < 10 ? '0' + tempEndDate.getDate() : tempEndDate.getDate());
        this.startDateStr = (endDate.getMonth() - 1 == -1 ? endDate.getFullYear() - 1 : endDate.getFullYear()) + "-" + (endDate.getMonth() - 1 == -1 ? 12 : (endDate.getMonth() + 1 < 10 ? ('0' + (endDate.getMonth())) : endDate.getMonth())) + "-" + (endDate.getDate() < 10 ? '0' + endDate.getDate() : endDate.getDate());
        this.chosenStartDate = startDate
        this.chosenEndDate = endDate
    }
    getChosenDate() {
        let tempEndDate = new Date(this.chosenEndDate);
        tempEndDate.setDate(tempEndDate.getDate() + 1);
        this.endDateStr = tempEndDate.getFullYear() + "-" + (tempEndDate.getMonth() + 1 < 10 ? ('0' + (tempEndDate.getMonth() + 1)) : tempEndDate.getMonth() + 1) + "-" + (tempEndDate.getDate() < 10 ? '0' + tempEndDate.getDate() : tempEndDate.getDate());
        let month = this.chosenStartDate.getMonth() + 1
        let day = this.chosenStartDate.getDate()
        this.startDateStr = (this.chosenStartDate.getFullYear()) + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day);
    }

    ngOnInit() {
        this.loading = true;
        if (localStorage.getItem('analyticsData')) {
            this.data_new = JSON.parse(localStorage.getItem('analyticsData'))
            this.hideChart = true;
            this.getInitialDate()
            this.getData()
            this.apiCall(this.startDateStr, this.endDateStr)
        }
        else {
            this.getInitialDate()
            this.apiCall(this.startDateStr, this.endDateStr)
        }
    }
    refresh() {
        this.loading = true;
        this.getChosenDate();
        this.apiCall(this.startDateStr, this.endDateStr)
    }
    onClick(event) {
        this.loading = true
        if (this.chosenStartDate && this.chosenEndDate) {
            this.getChosenDate()
            this.loading = true;
            this.apiCall(this.startDateStr, this.endDateStr)
        }
    }
    getData() {
        this.numberOfUsers = [];
        this.numberOfSessions = [];
        this.numberOfViews = [];
        this.numberOfClicks = [];
        this.nameData = [];
        this.nodeId = []
        let trimNameUser = [];
        let trimNameSession = []
        let trimNameView = []
        let trimNameClick = []
        for (let i = 0; i < this.data_new.length; i++) {
            this.nameData.push(this.data_new[i].nodeName);
            this.nodeId.push(this.data_new[i].nodeId);
            this.numberOfUsers.push(this.data_new[i].numberOfUsers);
            this.numberOfSessions.push(this.data_new[i].numberOfSessions);
            this.numberOfClicks.push(this.data_new[i].numberOfClicks);
            this.avgTimeSpent.push(this.data_new[i].averageTimeSpent);
            this.numberOfViews.push(this.data_new[i].numberOfViews);
        }
        for (let j = 0; j < this.nameData.length; j++) {

            trimNameUser.push(this.wrapText(this.nameData[j]));
            trimNameSession.push(this.wrapText(this.nameData[j]));
            trimNameView.push(this.wrapText(this.nameData[j]));
            trimNameClick.push(this.wrapText(this.nameData[j]));
        }

        this.usersData = [{
            data: this.numberOfUsers,
            label: this.usersLabel,
            type: "line",
            fill: false,
            pointRadius: 6,
            pointHoverRadius: 8
        }, {
            data: this.numberOfViews,
            label: this.viewsLabel,
            backgroundColor: "#ffb900"

        }]

        this.usersDataNew = [{
            data: this.numberOfClicks,
            label: this.clicksLabel,
            type: "line",
            fill: false,
            pointRadius: 6,
            pointHoverRadius: 8
        }, {
            data: this.numberOfUsers,
            label: this.usersLabel,
            backgroundColor: "#ffb900"
        }]

        this.trimNameUser = trimNameUser;
        this.trimNameSession = trimNameSession;
        this.trimNameView = trimNameView;
        this.trimNameClick = trimNameClick
    }

    apiCall(startDateStr, endDateStr) {
        this._data.getDetailsNew(startDateStr, endDateStr).subscribe(resData => {
            this.data_new = (resData)
            if (resData == null || Object.keys(resData).length == 0 || resData.length == 0) {
                if (localStorage.getItem('analyticsData')) {
                    this.data_new=JSON.parse(localStorage.getItem('analyticsData'));
                    this.getData()
                    this.errorMsg = true
                    return;
                }
                else{
                this.errorMsg = false
                this.loading = false
                }
                return;
            }
            else {
                localStorage.setItem("analyticsData", JSON.stringify(this.data_new))
                this.loading = false;
                this.errorMsg = true
                this.getData()
                this.hideChart = true;
            }

        }, error => {
                if (localStorage.getItem('analyticsData')) {
                    this.data_new=JSON.parse(localStorage.getItem('analyticsData'));
                    this.getData()
                    this.errorMsg = true
                    this.loading=false
                    return;
                }
                else{
                this.errorMsg = false
                this.loading = false
                }
        })
    }

    wrapText(str: string) {
        let ipString = str;
        let opString = '';
        if (ipString.length == 17) {
            opString = ipString;
            opString += '...';
            return opString
        } else {
            if (ipString.length < 17) {
                let spaces = 20 - ((ipString.length));
                let leftSpaces = Math.floor(spaces / 2);
                let rightSpaces = spaces - leftSpaces;
                for (let i = 0; i < leftSpaces; i++)
                    opString += " ";
                for (let i = 0; i < ipString.length; i++)
                    opString += ipString[i];
                for (let i = 0; i < rightSpaces; i++)
                    opString += " ";
                return opString
            } else {
                for (let i = 19, j = 0; i >= 0; i--) {
                    if ((ipString.charAt(i) == " ") && i < 17) {
                        for (j = 0; j <= i; j++) {
                            opString += (ipString[j]);
                        }
                        opString += '...';
                        i = 0;
                        if (opString.length < 20) {
                            ipString = opString;
                            opString = ""
                            let spaces = 20 - ((ipString.length));
                            let leftSpaces = Math.floor(spaces / 2);
                            let rightSpaces = spaces - leftSpaces;
                            for (i = 0; i < leftSpaces; i++)
                                opString += " ";
                            for (i = 0; i < ipString.length; i++)
                                opString += ipString[i];

                            for (i = 0; i < rightSpaces; i++)
                                opString += " ";
                            return opString
                        } else {
                            return opString
                        }
                    }

                }
            }

        }

    }
}