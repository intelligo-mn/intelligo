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
const core_1 = require("@angular/core");
const data_service_1 = require("../../shared/services/data/data.service");
let GoalConversionComponent = class GoalConversionComponent {
    constructor(_data) {
        this._data = _data;
        this.hideChart = false;
        this.loading = true;
        this.conversionPercentage = -1;
        this.checkApi = false;
        this.goalNodeData = {};
        this.nameData = [];
        this.goalNodeDetails = [];
        this.goalData = {};
        this.numberOfUsers = [];
        this.numberOfUsersNew = [];
        this.numberOfSessions = [];
        this.numberOfViews = [];
        this.numberOfClicks = [];
        this.usersLabel = "Number Of Users";
        this.sessionsLabel = "Number Of Sessions";
        this.viewsLabel = "Number Of Views";
        this.clicksLabel = "Number Of Clicks";
        this.usersData = [{
                data: this.numberOfViews,
                label: this.viewsLabel
            }, {
                data: this.numberOfUsersNew,
                label: this.usersLabel,
                type: "line",
                fill: false
            }];
        this.usersDataNew = [{
                data: this.numberOfUsers,
                label: this.usersLabel
            }, {
                data: this.numberOfClicks,
                label: this.clicksLabel,
                type: "line",
                fill: false
            }];
        this.trimNameUser = [];
        this.trimNameSession = [];
        this.trimNameView = [];
        this.trimNameClick = [];
        this.goalNodeName = [];
    }
    getInitialDate() {
        let startDate = new Date();
        let endDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1 == -1 ? 12 : startDate.getMonth() - 1);
        let tempEndDate = new Date(endDate);
        tempEndDate.setDate(tempEndDate.getDate() + 1);
        this.endDateStr = tempEndDate.getFullYear() + "-" + ((tempEndDate.getMonth() + 1) < 10 ? ('0' + (tempEndDate.getMonth() + 1)) : tempEndDate.getMonth() + 1) + "-" + (tempEndDate.getDate() < 10 ? '0' + tempEndDate.getDate() : tempEndDate.getDate());
        this.startDateStr = (endDate.getMonth() - 1 == -1 ? endDate.getFullYear() - 1 : endDate.getFullYear()) + "-" + (endDate.getMonth() - 1 == -1 ? 12 : (endDate.getMonth() + 1 < 10 ? ('0' + (endDate.getMonth())) : endDate.getMonth())) + "-" + (endDate.getDate() < 10 ? '0' + endDate.getDate() : endDate.getDate());
        this.chosenStartDate = startDate;
        this.chosenEndDate = endDate;
    }
    getChosenDate() {
        let tempEndDate = new Date(this.chosenEndDate);
        tempEndDate.setDate(tempEndDate.getDate() + 1);
        this.endDateStr = tempEndDate.getFullYear() + "-" + (tempEndDate.getMonth() + 1 < 10 ? ('0' + (tempEndDate.getMonth() + 1)) : tempEndDate.getMonth() + 1) + "-" + (tempEndDate.getDate() < 10 ? '0' + tempEndDate.getDate() : tempEndDate.getDate());
        let month = this.chosenStartDate.getMonth() + 1;
        let day = this.chosenStartDate.getDate();
        this.startDateStr = (this.chosenStartDate.getFullYear()) + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day);
    }
    drawWithLocalStorage() {
        this.goalNodeName = [];
        this.showGraph = true;
        for (let i = 0; i < this.goalNodeData[this.goalNode].length; i++) {
            this.numberOfUsers.push(this.goalNodeData[this.goalNode][i].numberOfUsers);
            this.goalNodeName.push(this.goalNodeData[this.goalNode][i].nodeName);
            this.numberOfViews.push(this.goalNodeData[this.goalNode][i].numberOfViews);
            this.numberOfClicks.push(this.goalNodeData[this.goalNode][i].numberOfClicks);
        }
        try {
            let finalCount = this.goalNodeData[this.goalNode][this.goalNodeData[this.goalNode].length - 1].numberOfUsers;
            let initialCount = this.goalNodeData[this.goalNode][0].numberOfUsers;
            let fullPecentage = (finalCount / initialCount) * 100;
            this.conversionPercentage = Math.round(fullPecentage * 100) / 100;
        }
        catch (Error) {
            console.log(Error + "conversion percentage error");
        }
        this.usersData = [{
                data: this.numberOfUsers,
                label: "Number Of Users",
                type: "line",
                fill: false
            }, {
                data: this.numberOfViews,
                label: "Number Of Views",
            }];
        this.usersDataNew = [{
                data: this.numberOfClicks,
                label: "Number Of Clicks",
                type: "line",
                fill: false
            }, {
                data: this.numberOfUsers,
                label: "Number Of Users",
            }];
        for (let i = 0; i < this.goalNodeName.length; i++) {
            this.trimNameUser.push(this.wrapText(this.goalNodeName[i]));
            this.trimNameClick.push(this.wrapText(this.goalNodeName[i]));
        }
        this.hideChart = true;
        this.loading = false;
    }
    ngOnInit() {
        this.getInitialDate();
        if (localStorage.getItem('goalNodes')) {
            this.goalData = JSON.parse(localStorage.getItem('goalNodes'));
            if (Object.keys(this.goalData).length == 0 || !this.goalData)
                this.checkApi = false;
            else
                this.checkApi = true;
            this._data.getGoalNodeDetails().subscribe(resData => {
                if (!resData || Object.keys(resData).length == 0) {
                    this.checkApi = false;
                    return;
                }
                localStorage.setItem('goalNodes', JSON.stringify(resData));
                this.goalData = resData;
                if (Object.keys(this.goalData).length == 0)
                    this.checkApi = false;
                else
                    this.checkApi = true;
            }, error => {
                if (localStorage.getItem('goalNodes')) {
                    this.goalData = JSON.parse(localStorage.getItem('goalNodes'));
                    this.loading = false;
                    this.checkApi = true;
                }
                else {
                    this.loading = false;
                    this.checkApi = false;
                }
            });
        }
        else {
            this._data.getGoalNodeDetails().subscribe(resData => {
                if (!resData || Object.keys(resData).length == 0) {
                    this.checkApi = false;
                    return;
                }
                localStorage.setItem('goalNodes', JSON.stringify(resData));
                this.goalData = resData;
                if (Object.keys(this.goalData).length == 0 || !resData)
                    this.checkApi = false;
                else
                    this.checkApi = true;
            }, error => {
                if (localStorage.getItem('goalNodes')) {
                    this.goalData = JSON.parse(localStorage.getItem('goalNodes'));
                    this.loading = false;
                    this.checkApi = true;
                }
                else {
                    this.loading = false;
                    this.checkApi = false;
                }
            });
        }
        if (localStorage.getItem('goalNodes') && localStorage.getItem('goalNodeData') && localStorage.getItem('goalNodeNames')) {
            let goalNodeId = [];
            this.numberOfUsers = [];
            this.numberOfUsersNew = [];
            this.numberOfViews = [];
            this.numberOfClicks = [];
            this.goalNodeName = [];
            this.trimNameUser = [];
            this.trimNameClick = [];
            this.goalNodeName = [];
            this.goalData = JSON.parse(localStorage.getItem('goalNodes'));
            let goalNodeData = JSON.parse(localStorage.getItem('goalNodeData'));
            this.goalNode = JSON.parse(localStorage.getItem('goalNodeId'));
            this.goalNodeName = JSON.parse(localStorage.getItem('goalNodeNames'));
            try {
                let finalCount = goalNodeData[goalNodeData.length - 1].numberOfUsers;
                let initialCount = goalNodeData[0].numberOfUsers;
                let fullPecentage = (finalCount / initialCount) * 100;
                this.conversionPercentage = Math.round(fullPecentage * 100) / 100;
            }
            catch (Error) {
                console.log(Error + "conversion percentage error");
            }
            for (let i = 0; i < goalNodeData.length; i++) {
                this.numberOfUsers.push(goalNodeData[i].numberOfUsers);
                this.goalNodeName.push(goalNodeData[i].nodeName);
                this.numberOfViews.push(goalNodeData[i].numberOfViews);
                this.numberOfClicks.push(goalNodeData[i].numberOfClicks);
            }
            this.usersData = [{
                    data: this.numberOfUsers,
                    label: "Number Of Users",
                    type: "line",
                    fill: false
                }, {
                    data: this.numberOfViews,
                    label: "Number Of Views",
                }];
            this.usersDataNew = [{
                    data: this.numberOfClicks,
                    label: "Number Of Clicks",
                    type: "line",
                    fill: false
                }, {
                    data: this.numberOfUsers,
                    label: "Number Of Users",
                }];
            for (let i = 0; i < this.goalNodeName.length; i++) {
                this.trimNameUser.push(this.wrapText(this.goalNodeName[i]));
                this.trimNameClick.push(this.wrapText(this.goalNodeName[i]));
            }
            this.hideChart = true;
            this._data.getGoalNodeDetails().subscribe(resData => {
                if (!resData || Object.keys(resData).length == 0) {
                    this.loading = false;
                    this.showDropdown = false;
                    this.showGraph = false;
                    return;
                }
                localStorage.removeItem('goalNodes');
                localStorage.removeItem('goalNodeId');
                localStorage.removeItem('goalNodeData');
                localStorage.removeItem('goalNodeNames');
                localStorage.setItem('goalNodes', JSON.stringify(resData));
                this.showDropdown = true;
                this.goalData = (resData);
                this.goalNodeId = Object.keys(this.goalData);
                this.goalNode = this.goalNodeId[0];
                localStorage.setItem('goalNodeId', JSON.stringify(this.goalNodeId[0]));
                this._data.getGoalNodeData(this.goalNode, this.startDateStr, this.endDateStr).subscribe((resData) => {
                    this.goalNodeData = (resData);
                    if (!resData || Object.keys(resData).length == 0) {
                        this.showGraph = false;
                        this.loading = false;
                        return;
                    }
                    localStorage.setItem('goalNodeData', JSON.stringify(resData));
                    this.showGraph = true;
                    this.goalNodeName = [];
                    for (let i = 0; i < this.goalNodeData[this.goalNode].length; i++) {
                        this.numberOfUsers.push(this.goalNodeData[this.goalNode][i].numberOfUsers);
                        this.goalNodeName.push(this.goalNodeData[this.goalNode][i].nodeName);
                        this.numberOfViews.push(this.goalNodeData[this.goalNode][i].numberOfViews);
                        this.numberOfClicks.push(this.goalNodeData[this.goalNode][i].numberOfClicks);
                    }
                    localStorage.setItem('goalNodeNames', JSON.stringify(this.goalNodeName));
                    try {
                        let finalCount = this.goalNodeData[this.goalNode][this.goalNodeData[this.goalNode].length - 1].numberOfUsers;
                        let initialCount = this.goalNodeData[this.goalNode][0].numberOfUsers;
                        let fullPecentage = (finalCount / initialCount) * 100;
                        this.conversionPercentage = Math.round(fullPecentage * 100) / 100;
                    }
                    catch (Error) {
                        console.log(Error + "conversion percentage error");
                    }
                    this.usersData = [{
                            data: this.numberOfUsers,
                            label: "Number Of Users",
                            type: "line",
                            fill: false
                        }, {
                            data: this.numberOfViews,
                            label: "Number Of Views",
                        }];
                    this.usersDataNew = [{
                            data: this.numberOfClicks,
                            label: "Number Of Clicks",
                            type: "line",
                            fill: false
                        }, {
                            data: this.numberOfUsers,
                            label: "Number Of Users",
                        }];
                    for (let i = 0; i < this.goalNodeName.length; i++) {
                        this.trimNameUser.push(this.wrapText(this.goalNodeName[i]));
                        this.trimNameClick.push(this.wrapText(this.goalNodeName[i]));
                    }
                    this.hideChart = true;
                    this.loading = false;
                }, error => {
                    if (localStorage.getItem('goalNodeId') && localStorage.getItem('goalNodeData') && localStorage.getItem('goalNodeNames')) {
                        this.goalNodeId = Object.keys(JSON.parse(localStorage.getItem('goalNodes')));
                        this.goalNode = JSON.parse(localStorage.getItem('goalNodeId'));
                        this.goalNodeData = JSON.parse(localStorage.getItem('goalNodeData'));
                        this.goalNodeName = JSON.parse(localStorage.getItem('goalNodeNames'));
                        this.drawWithLocalStorage();
                        this.showGraph = true;
                        this.loading = false;
                    }
                    else {
                        this.showGraph = false;
                        this.loading = false;
                    }
                });
            }, error => {
                if (localStorage.getItem('goalNodes')) {
                    if (localStorage.getItem('goalNodeId') && localStorage.getItem('goalNodeData') && localStorage.getItem('goalNodeNames')) {
                        this.goalNodeId = Object.keys(JSON.parse(localStorage.getItem('goalNodes')));
                        this.goalNode = JSON.parse(localStorage.getItem('goalNodeId'));
                        this.goalNodeData = JSON.parse(localStorage.getItem('goalNodeData'));
                        this.goalNodeName = JSON.parse(localStorage.getItem('goalNodeNames'));
                        this.drawWithLocalStorage();
                        this.loading = false;
                        this.showDropdown = true;
                        this.showGraph = true;
                    }
                }
                else {
                    this.showGraph = false;
                    this.showDropdown = false;
                    this.loading = false;
                }
            });
        }
        else {
            let goalNodeId = [];
            this.numberOfUsers = [];
            this.numberOfUsersNew = [];
            this.numberOfViews = [];
            this.numberOfClicks = [];
            this.goalNodeName = [];
            this.trimNameUser = [];
            this.trimNameClick = [];
            this._data.getGoalNodeDetails().subscribe(resData => {
                if (!resData || Object.keys(resData).length == 0) {
                    this.showDropdown = false;
                    this.showGraph = false;
                    this.loading = false;
                    return;
                }
                this.showDropdown = true;
                localStorage.setItem('goalNodes', JSON.stringify(resData));
                this.goalData = (resData);
                this.goalNodeId = Object.keys(this.goalData);
                this.goalNode = this.goalNodeId[0];
                localStorage.setItem('goalNodeId', JSON.stringify(this.goalNodeId[0]));
                this._data.getGoalNodeData(this.goalNode, this.startDateStr, this.endDateStr).subscribe((resData) => {
                    if (!resData || Object.keys(resData).length == 0) {
                        this.loading = false;
                        this.showGraph = false;
                        return;
                    }
                    localStorage.removeItem('goalNodes');
                    localStorage.removeItem('goalNodeId');
                    localStorage.removeItem('goalNodeData');
                    localStorage.removeItem('goalNodeNames');
                    this.goalNodeName = [];
                    this.showGraph = true;
                    this.goalNodeData = (resData);
                    localStorage.setItem('goalNodeData', JSON.stringify(resData));
                    try {
                        let finalCount = this.goalNodeData[this.goalNode][this.goalNodeData[this.goalNode].length - 1].numberOfUsers;
                        let initialCount = this.goalNodeData[this.goalNode][0].numberOfUsers;
                        let fullPecentage = (finalCount / initialCount) * 100;
                        this.conversionPercentage = Math.round(fullPecentage * 100) / 100;
                    }
                    catch (Error) {
                        console.log(Error + "conversion percentage error");
                    }
                    for (let i = 0; i < this.goalNodeData[this.goalNode].length; i++) {
                        this.numberOfUsers.push(this.goalNodeData[this.goalNode][i].numberOfUsers);
                        this.goalNodeName.push(this.goalNodeData[this.goalNode][i].nodeName);
                        this.numberOfViews.push(this.goalNodeData[this.goalNode][i].numberOfViews);
                        this.numberOfClicks.push(this.goalNodeData[this.goalNode][i].numberOfClicks);
                    }
                    localStorage.setItem('goalNodeNames', JSON.stringify(this.goalNodeName));
                    this.usersData = [{
                            data: this.numberOfUsers,
                            label: "Number Of Users",
                            type: "line",
                            fill: false
                        }, {
                            data: this.numberOfViews,
                            label: "Number Of Views",
                        }];
                    this.usersDataNew = [{
                            data: this.numberOfClicks,
                            label: "Number Of Clicks",
                            type: "line",
                            fill: false
                        }, {
                            data: this.numberOfUsers,
                            label: "Number Of Users",
                        }];
                    for (let i = 0; i < this.goalNodeName.length; i++) {
                        this.trimNameUser.push(this.wrapText(this.goalNodeName[i]));
                        this.trimNameClick.push(this.wrapText(this.goalNodeName[i]));
                    }
                    this.hideChart = true;
                    this.loading = false;
                }, error => {
                    if (localStorage.getItem('goalNodeId') && localStorage.getItem('goalNodeData') && localStorage.getItem('goalNodeNames')) {
                        this.goalNodeId = Object.keys(JSON.parse(localStorage.getItem('goalNodes')));
                        this.goalNode = JSON.parse(localStorage.getItem('goalNode'));
                        this.goalNodeData = JSON.parse(localStorage.getItem('goalNodeData'));
                        this.goalNodeName = JSON.parse(localStorage.getItem('goalNodeNames'));
                        this.drawWithLocalStorage();
                        this.showGraph = true;
                        this.loading = false;
                    }
                    else {
                        this.showGraph = false;
                        this.loading = false;
                    }
                });
            }, error => {
                if (localStorage.getItem('goalNodes')) {
                    if (localStorage.getItem('goalNodeId') && localStorage.getItem('goalNodeData') && localStorage.getItem('goalNodeNames')) {
                        this.goalNodeId = Object.keys(JSON.parse(localStorage.getItem('goalNodes')));
                        this.goalNode = JSON.parse(localStorage.getItem('goalNodeId'));
                        this.goalData = JSON.parse(localStorage.getItem('goalNodeData'));
                        this.goalNodeName = JSON.parse(localStorage.getItem('goalNodeNames'));
                        this.drawWithLocalStorage();
                        this.loading = false;
                        this.showDropdown = true;
                        this.showGraph = true;
                    }
                }
                else {
                    this.showGraph = false;
                    this.showDropdown = false;
                    this.loading = false;
                }
            });
        }
    }
    refresh() {
        if (this.chosenEndDate && this.chosenStartDate) {
            this.getChosenDate();
            this._data.getGoalNodeData(this.goalNode, this.startDateStr, this.endDateStr).subscribe((resData) => {
                if (!resData || Object.keys(resData).length == 0) {
                    this.loading = false;
                    this.showGraph = false;
                    return;
                }
                localStorage.removeItem('goalNodeId');
                localStorage.removeItem('goalNodeData');
                localStorage.removeItem('goalNodeNames');
                localStorage.setItem('goalNodeId', JSON.stringify(this.goalNode));
                localStorage.setItem('goalNodeData', JSON.stringify(resData));
                try {
                    let finalCount = this.goalNodeData[this.goalNode][this.goalNodeData[this.goalNode].length - 1].numberOfUsers;
                    let initialCount = this.goalNodeData[this.goalNode][0].numberOfUsers;
                    let fullPecentage = (finalCount / initialCount) * 100;
                    this.conversionPercentage = Math.round(fullPecentage * 100) / 100;
                }
                catch (Error) {
                    console.log(Error + "conversion perccentage error");
                }
                this.showGraph = true;
                this.goalNodeData = (resData);
                let goalNodeId = [];
                this.numberOfUsers = [];
                this.numberOfUsersNew = [];
                this.numberOfViews = [];
                this.numberOfClicks = [];
                this.goalNodeName = [];
                this.trimNameUser = [];
                this.trimNameClick = [];
                for (let i = 0; i < this.goalNodeData[this.goalNode].length; i++) {
                    this.goalNodeName.push(this.goalNodeData[this.goalNode][i].nodeName);
                    this.numberOfUsers.push(this.goalNodeData[this.goalNode][i].numberOfUsers);
                    this.numberOfUsersNew.push(this.goalNodeData[this.goalNode][i].numberOfUsers);
                    this.numberOfViews.push(this.goalNodeData[this.goalNode][i].numberOfViews);
                    this.numberOfClicks.push(this.goalNodeData[this.goalNode][i].numberOfClicks);
                }
                localStorage.setItem('goalNodeNames', JSON.stringify(this.goalNodeName));
                this.usersData = [{
                        data: this.numberOfUsers,
                        label: "Number Of Users",
                        type: "line",
                        fill: false
                    }, {
                        data: this.numberOfViews,
                        label: "Number Of Views"
                    }];
                this.usersDataNew = [{
                        data: this.numberOfClicks,
                        label: "Number Of Clicks",
                        type: "line",
                        fill: false
                    }, {
                        data: this.numberOfUsersNew,
                        label: "Number Of Users"
                    }];
                let _trimNameUser = [];
                let _trimNameClick = [];
                for (let i = 0; i < this.goalNodeName.length; i++) {
                    _trimNameUser.push(this.wrapText(this.goalNodeName[i]));
                    _trimNameClick.push(this.wrapText(this.goalNodeName[i]));
                }
                this.trimNameUser = _trimNameUser;
                this.trimNameClick = _trimNameClick;
                this.loading = false;
            }, error => {
                if (localStorage.getItem('goalNodeId') && localStorage.getItem('goalNodeData') && localStorage.getItem('goalNodeNames')) {
                    this.goalNodeId = Object.keys(JSON.parse(localStorage.getItem('goalNodes')));
                    this.goalNode = JSON.parse(localStorage.getItem('goalNodeId'));
                    this.goalNodeData = JSON.parse(localStorage.getItem('goalNodeData'));
                    this.goalNodeName = JSON.parse(localStorage.getItem('goalNodeNames'));
                    this.drawWithLocalStorage();
                    this.showGraph = true;
                    this.loading = false;
                }
                else {
                    this.showGraph = false;
                    this.loading = false;
                }
            });
        }
    }
    onClick(event) {
        this.loading = true;
        if (this.chosenStartDate && this.chosenEndDate) {
            this.getChosenDate();
            this._data.getGoalNodeData(this.goalNode, this.startDateStr, this.endDateStr).subscribe((resData) => {
                if (!resData || Object.keys(resData).length == 0) {
                    this.loading = false;
                    this.showGraph = false;
                    return;
                }
                localStorage.removeItem('goalNodeId');
                localStorage.removeItem('goalNodeData');
                localStorage.removeItem('goalNodeNames');
                localStorage.setItem('goalNodeId', JSON.stringify(this.goalNode));
                localStorage.setItem('goalNodeData', JSON.stringify(resData));
                try {
                    let finalCount = this.goalNodeData[this.goalNode][this.goalNodeData[this.goalNode].length - 1].numberOfUsers;
                    let initialCount = this.goalNodeData[this.goalNode][0].numberOfUsers;
                    let fullPecentage = (finalCount / initialCount) * 100;
                    this.conversionPercentage = Math.round(fullPecentage * 100) / 100;
                }
                catch (Error) {
                    console.log(Error + "conversion perccentage error");
                }
                this.showGraph = true;
                this.goalNodeData = (resData);
                let goalNodeId = [];
                this.numberOfUsers = [];
                this.numberOfUsersNew = [];
                this.numberOfViews = [];
                this.numberOfClicks = [];
                this.goalNodeName = [];
                this.trimNameUser = [];
                this.trimNameClick = [];
                for (let i = 0; i < this.goalNodeData[this.goalNode].length; i++) {
                    this.goalNodeName.push(this.goalNodeData[this.goalNode][i].nodeName);
                    this.numberOfUsers.push(this.goalNodeData[this.goalNode][i].numberOfUsers);
                    this.numberOfUsersNew.push(this.goalNodeData[this.goalNode][i].numberOfUsers);
                    this.numberOfViews.push(this.goalNodeData[this.goalNode][i].numberOfViews);
                    this.numberOfClicks.push(this.goalNodeData[this.goalNode][i].numberOfClicks);
                }
                localStorage.setItem('goalNodeNames', JSON.stringify(this.goalNodeName));
                this.usersData = [{
                        data: this.numberOfUsers,
                        label: "Number Of Users",
                        type: "line",
                        fill: false
                    }, {
                        data: this.numberOfViews,
                        label: "Number Of Views"
                    }];
                this.usersDataNew = [{
                        data: this.numberOfClicks,
                        label: "Number Of Clicks",
                        type: "line",
                        fill: false
                    }, {
                        data: this.numberOfUsersNew,
                        label: "Number Of Users"
                    }];
                let _trimNameUser = [];
                let _trimNameClick = [];
                for (let i = 0; i < this.goalNodeName.length; i++) {
                    _trimNameUser.push(this.wrapText(this.goalNodeName[i]));
                    _trimNameClick.push(this.wrapText(this.goalNodeName[i]));
                }
                this.trimNameUser = _trimNameUser;
                this.trimNameClick = _trimNameClick;
                this.loading = false;
            }, error => {
                if (localStorage.getItem('goalNodeId') && localStorage.getItem('goalNodeData') && localStorage.getItem('goalNodeNames')) {
                    this.goalNodeId = Object.keys(JSON.parse(localStorage.getItem('goalNodes')));
                    this.goalNode = JSON.parse(localStorage.getItem('goalNodeId'));
                    this.goalNodeData = JSON.parse(localStorage.getItem('goalNodeData'));
                    this.goalNodeName = JSON.parse(localStorage.getItem('goalNodeNames'));
                    this.drawWithLocalStorage();
                    this.showGraph = true;
                    this.loading = false;
                }
                else {
                    this.showGraph = false;
                    this.loading = false;
                }
            });
        }
    }
    getAnalytics() {
        this.loading = true;
        let NodeId = this.goalNode;
        let goalNodeId = [];
        this.numberOfUsers = [];
        this.numberOfUsersNew = [];
        this.numberOfViews = [];
        this.numberOfClicks = [];
        this.goalNodeName = [];
        this.trimNameUser = [];
        this.trimNameClick = [];
        this.getInitialDate();
        this._data.getGoalNodeData(this.goalNode, this.startDateStr, this.endDateStr).subscribe((resData) => {
            if (!resData || Object.keys(resData).length == 0) {
                this.loading = false;
                this.showGraph = false;
                return;
            }
            localStorage.removeItem('goalNodeId');
            localStorage.removeItem('goalNodeData');
            localStorage.removeItem('goalNodeNames');
            this.showGraph = true;
            localStorage.setItem('goalNodeId', JSON.stringify(this.goalNode));
            localStorage.setItem('goalNodeData', JSON.stringify(resData));
            this.goalNodeData = (resData);
            try {
                let finalCount = this.goalNodeData[this.goalNode][this.goalNodeData[this.goalNode].length - 1].numberOfUsers;
                let initialCount = this.goalNodeData[this.goalNode][0].numberOfUsers;
                let fullPecentage = (finalCount / initialCount) * 100;
                this.conversionPercentage = Math.round(fullPecentage * 100) / 100;
            }
            catch (Error) {
                console.log(Error + "conversion perccentage error");
            }
            for (let i = 0; i < this.goalNodeData[NodeId].length; i++) {
                this.goalNodeName.push(this.goalNodeData[this.goalNode][i].nodeName);
                this.numberOfUsers.push(this.goalNodeData[NodeId][i].numberOfUsers);
                this.numberOfUsersNew.push(this.goalNodeData[NodeId][i].numberOfUsers);
                this.numberOfViews.push(this.goalNodeData[NodeId][i].numberOfViews);
                this.numberOfClicks.push(this.goalNodeData[NodeId][i].numberOfClicks);
            }
            localStorage.setItem('goalNodeNames', JSON.stringify(this.goalNodeName));
            this.usersData = [{
                    data: this.numberOfUsers,
                    label: "Number Of Users",
                    type: "line",
                    fill: false
                }, {
                    data: this.numberOfViews,
                    label: "Number Of Views"
                }];
            this.usersDataNew = [{
                    data: this.numberOfClicks,
                    label: "Number Of Clicks",
                    type: "line",
                    fill: false
                }, {
                    data: this.numberOfUsersNew,
                    label: "Number Of Users"
                }];
            let _trimNameUser = [];
            let _trimNameClick = [];
            for (let i = 0; i < this.goalNodeName.length; i++) {
                _trimNameUser.push(this.wrapText(this.goalNodeName[i]));
                _trimNameClick.push(this.wrapText(this.goalNodeName[i]));
            }
            this.trimNameUser = _trimNameUser;
            this.trimNameClick = _trimNameClick;
            this.loading = false;
        }, error => {
            if (localStorage.getItem('goalNodeId') && localStorage.getItem('goalNodeData') && localStorage.getItem('goalNodeNames')) {
                this.goalNodeId = Object.keys(JSON.parse(localStorage.getItem('goalNodes')));
                this.goalNode = JSON.parse(localStorage.getItem('goalNodeId'));
                this.goalNodeData = JSON.parse(localStorage.getItem('goalNodeData'));
                this.goalNodeName = JSON.parse(localStorage.getItem('goalNodeNames'));
                this.drawWithLocalStorage();
                this.showGraph = true;
                this.loading = false;
            }
            else {
                this.showGraph = false;
                this.loading = false;
            }
        });
    }
    wrapText(str) {
        let ipString = str;
        let opString = '';
        if (ipString.length == 17) {
            opString = ipString;
            opString += '...';
            return opString;
        }
        else {
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
                return opString;
            }
            else {
                for (let i = 19, j = 0; i >= 0; i--) {
                    if ((ipString.charAt(i) == " ") && i < 17) {
                        for (j = 0; j <= i; j++) {
                            opString += (ipString[j]);
                        }
                        opString += '...';
                        i = 0;
                        if (opString.length < 20) {
                            ipString = opString;
                            opString = "";
                            let spaces = 20 - ((ipString.length));
                            let leftSpaces = Math.floor(spaces / 2);
                            let rightSpaces = spaces - leftSpaces;
                            for (i = 0; i < leftSpaces; i++)
                                opString += " ";
                            for (i = 0; i < ipString.length; i++)
                                opString += ipString[i];
                            for (i = 0; i < rightSpaces; i++)
                                opString += " ";
                            return opString;
                        }
                        else {
                            return opString;
                        }
                    }
                }
            }
        }
    }
};
GoalConversionComponent = __decorate([
    core_1.Component({
        selector: 'goal-conversion',
        templateUrl: './goalConversion.component.html',
        styleUrls: ['./goalConversion.component.scss']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService])
], GoalConversionComponent);
exports.GoalConversionComponent = GoalConversionComponent;
//# sourceMappingURL=goalConversion.component.js.map