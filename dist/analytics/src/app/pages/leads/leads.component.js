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
const FileSaver = require("file-saver");
const XLSX = require("xlsx");
let LeadsComponent = class LeadsComponent {
    constructor(_data) {
        this._data = _data;
        this.EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        this.EXCEL_EXTENSION = '.xlsx';
        this.errorMsg = true;
        this.rows = [];
        this.exportData = [];
        this.temp = [];
        this.userData = [];
        this.isSelected = false;
        this.Loading = false;
        this.varData = {};
        this.slno = 0;
        this.displayData = [];
        this.channels = [];
        this.columns = [
            { name: "Sl. No.", prop: "slNo" },
            { name: "Date", prop: "date" },
            { name: "Channel", prop: "channel" },
            { name: "Time Spent", prop: "timeSpan" },
            { name: "Interactions", prop: "noOfInteractions" },
        ];
        this.selected = {};
        this.checkedItem = {};
        this.filteredRecords = [];
    }
    getVarData(slno) {
        let r = this.userData.filter(x => x.slNo == slno);
        if (r && r.length > 0) {
            return r[0].variableData;
        }
        return {};
    }
    reloadTableData() {
        if (!this.userData) {
            return;
        }
        this.rows = this.userData.map(x => {
            let r = {
                slNo: x.slNo,
                date: x.date,
                channel: x.channel,
                timeSpent: x.timeSpent,
                timeSpan: x.timeSpan,
                noOfInteractions: x.noOfInteractions,
            };
            return r;
        });
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
    ngOnInit() {
        if (localStorage.getItem('rowsData')) {
            this.userData = JSON.parse(localStorage.getItem('rowsData'));
            this.reloadTableData();
            this.filteredRecords = this.rows;
            this.excelData = JSON.parse(localStorage.getItem('rowsData'));
            let channels = new Set();
            for (let i = 0; i < this.filteredRecords.length; i++) {
                channels.add(this.filteredRecords[i].channel);
            }
            this.channels = Array.from(channels);
            this.Loading = true;
            this.temp = [...this.rows];
            this.getInitialDate();
            this._data.getUsersData(this.startDateStr, this.endDateStr).subscribe(resData => {
                localStorage.setItem('rowsData', JSON.stringify(resData));
                this.userData = resData;
                this.excelData = resData;
                this.reloadTableData();
                this.filteredRecords = this.rows;
                let channels = new Set();
                for (let i = 0; i < this.filteredRecords.length; i++) {
                    channels.add(this.filteredRecords[i].channel);
                }
                this.channels = Array.from(channels);
                this.Loading = true;
                this.temp = [...this.rows];
            });
        }
        else {
            this.getInitialDate();
            this._data.getUsersData(this.startDateStr, this.endDateStr).subscribe(resData => {
                this.errorMsg = true;
                localStorage.setItem('rowsData', JSON.stringify(resData));
                this.userData = resData;
                this.excelData = resData;
                this.reloadTableData();
                this.filteredRecords = this.rows;
                let channels = new Set();
                for (let i = 0; i < this.filteredRecords.length; i++) {
                    channels.add(this.filteredRecords[i].channel);
                }
                this.channels = Array.from(channels);
                this.Loading = true;
                this.temp = [...this.rows];
            });
        }
    }
    onSelect(event) {
        try {
            this.slno = (event.selected[0].slNo);
            this.varData = this.getVarData(event.selected[0].slNo);
            this.displayData = Object.keys(this.varData);
            this.isSelected = true;
        }
        catch (error) {
            console.log(error);
        }
    }
    onClick(event) {
        if (this.chosenStartDate && this.chosenEndDate) {
            this.getChosenDate();
            this._data.getUsersData(this.startDateStr, this.endDateStr).subscribe(resData => {
                if (!resData) {
                    return;
                }
                this.temp = resData;
                this.excelData = resData;
                let channels = new Set();
                for (let i = 0; i < this.temp.length; i++) {
                    channels.add(this.temp[i].channel);
                }
                this.channels = Array.from(channels);
                this.rows = this.temp;
                this.userData = this.temp;
                this.filteredRecords = this.temp;
            });
        }
    }
    onCheckChanged(event) {
        this.checkedItem[event.source.value.toLowerCase()] = event.checked;
        this.filteredRecords = this.filterRecords();
    }
    filterRecords() {
        let temp = [];
        let flag = 0;
        this.excelData = [];
        let storedRecords = [];
        let keys = Object.keys(this.checkedItem);
        for (let i in this.checkedItem) {
            if (this.checkedItem[i] == true) {
                let t = this.rows.filter((d) => {
                    return d.channel.toLowerCase().indexOf(i.toLowerCase()) != -1;
                });
                let p = this.excelData.filter((d) => {
                    if (d.channel.toLowerCase().indexOf(i.toLowerCase()) != -1)
                        return d.variableData;
                });
                storedRecords = storedRecords.concat(p);
                temp = temp.concat(t);
                flag = 1;
            }
        }
        this.excelData = storedRecords;
        return temp;
    }
    exportDataAsExcel() {
        let merge = [];
        this.exportData = [];
        for (let i = 0; i < this.filteredRecords.length; i++) {
            merge[i] = {};
            merge[i]['Sl No'] = this.filteredRecords[i]['slNo'];
            merge[i]['Date'] = this.filteredRecords[i]['date'];
            merge[i]['Channel'] = this.filteredRecords[i]['channel'];
            merge[i]['Timespent'] = this.filteredRecords[i]['timeSpent'];
            merge[i]['Timespan'] = this.filteredRecords[i]['timeSpan'];
            merge[i]['Interactions'] = this.filteredRecords[i]['noOfInteractions'];
        }
        for (let i = 0; i < this.excelData.length; i++) {
            let test = Object.assign(merge[i], this.excelData[i].variableData);
            this.exportData.push(test);
        }
        this.exportAsExcelFile(this.exportData, "excel data");
    }
    exportAsExcelFile(json, excelFileName) {
        const worksheet = XLSX.utils.json_to_sheet(json);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }
    saveAsExcelFile(buffer, fileName) {
        const data = new Blob([buffer], {
            type: this.EXCEL_TYPE
        });
        let endDateStr = this.chosenEndDate.getFullYear() + "-" + (this.chosenEndDate.getMonth() + 1) + "-" + this.chosenEndDate.getDate();
        let startDateStr = (this.chosenStartDate.getMonth() == 0 ? this.chosenStartDate.getFullYear() - 1 : this.chosenStartDate.getFullYear()) + "-" + (this.chosenStartDate.getMonth() == -1 ? 12 : this.chosenStartDate.getMonth() + 1) + "-" + this.chosenStartDate.getDate();
        FileSaver.saveAs(data, this._data.businessName + "-" + this._data.chatFlowId + '-datadump-' + startDateStr + "--" + endDateStr + this.EXCEL_EXTENSION);
    }
};
LeadsComponent = __decorate([
    core_1.Component({
        selector: "users-data",
        templateUrl: "./leads.component.html",
        styleUrls: ["./leads.component.scss"],
    }),
    __metadata("design:paramtypes", [data_service_1.DataService])
], LeadsComponent);
exports.LeadsComponent = LeadsComponent;
//# sourceMappingURL=leads.component.js.map