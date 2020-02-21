import { Component } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { DataService, UserDataItem } from "../../shared/services/data/data.service"
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { keyframes } from "@angular/core/src/animation/dsl";
import { ViewEncapsulation } from "@angular/core/src/metadata/view";
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
	selector: "users-data",
	templateUrl: "./leads.component.html",
	styleUrls: ["./leads.component.scss"],

})
export class LeadsComponent implements OnInit {
	startDateStr: string;
	endDateStr: string;
	excelData: any;
	EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
	EXCEL_EXTENSION = '.xlsx';
	errorMsg: boolean = true;
	rows: TableRow[] = [];
	exportData = [];
	temp = [];
	userData: UserDataItem[] = [];
	isSelected: boolean = false;
	Loading = false;
	varData = {};
	slno: number = 0;
	displayData = [];
	chosenStartDate: Date;
	chosenEndDate: Date;
	channels = [];

	columns = [
		{ name: "Sl. No.", prop: "slNo" },
		{ name: "Date", prop: "date" },
		{ name: "Channel", prop: "channel" },
		{ name: "Time Spent", prop: "timeSpan" },
		{ name: "Interactions",prop:"noOfInteractions"},
];

	constructor(private _data: DataService) {
	}

	getVarData(slno: number) {
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
			let r: TableRow = {
				slNo: x.slNo,
				date: x.date,
				channel: x.channel,
				timeSpent: x.timeSpent,
				timeSpan:x.timeSpan,
				noOfInteractions:x.noOfInteractions,
			};
			return r;
			
		});
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
		if (localStorage.getItem('rowsData')) {
			this.userData = JSON.parse(localStorage.getItem('rowsData'))
			this.reloadTableData();
			this.filteredRecords = this.rows
			this.excelData=JSON.parse(localStorage.getItem('rowsData'))
			let channels = new Set()
			for (let i = 0; i < this.filteredRecords.length; i++) {
				channels.add(this.filteredRecords[i].channel)
			}
			this.channels = Array.from(channels)
			this.Loading = true;
			this.temp = [...this.rows]
			this.getInitialDate()
			this._data.getUsersData(this.startDateStr, this.endDateStr).subscribe(resData => {
				localStorage.setItem('rowsData',JSON.stringify(resData))
				
				this.userData = resData;
				this.excelData = resData;
				this.reloadTableData();
				this.filteredRecords = this.rows  
				//console.log(this.filteredRecords)
				
				let channels = new Set()
				for (let i = 0; i < this.filteredRecords.length; i++) {
					channels.add(this.filteredRecords[i].channel)
				}
				this.channels = Array.from(channels)
				this.Loading = true;
				this.temp = [...this.rows]
			})
		}
		else {
			this.getInitialDate()
			this._data.getUsersData(this.startDateStr, this.endDateStr).subscribe(resData => {

				this.errorMsg = true
				localStorage.setItem('rowsData', JSON.stringify(resData))
				this.userData = resData;
				this.excelData = resData;
				this.reloadTableData();
				this.filteredRecords = this.rows
				//console.log(this.filteredRecords)
				let channels = new Set()
				for (let i = 0; i < this.filteredRecords.length; i++) {
					channels.add(this.filteredRecords[i].channel)
				}
				this.channels = Array.from(channels)
				this.Loading = true;
				this.temp = [...this.rows]
			})
		}
	}

	selected: any = {};

	onSelect(event: any) {
		try {
			this.slno = (event.selected[0].slNo)
			this.varData = this.getVarData((<TableRow>event.selected[0]).slNo);
			this.displayData = Object.keys(this.varData);
			this.isSelected = true;
		} catch (error) {
			console.log(error);
		}
	}

	onClick(event: any) {
		if (this.chosenStartDate && this.chosenEndDate) {

			this.getChosenDate()
		
			this._data.getUsersData(this.startDateStr, this.endDateStr).subscribe(resData => {
				if (!resData) {
					return;
				}
				this.temp = resData;
				this.excelData = resData;
				let channels = new Set()
				for (let i = 0; i < this.temp.length; i++) {
					channels.add(this.temp[i].channel)
				}
				this.channels = Array.from(channels)
				this.rows = this.temp;
				this.userData = this.temp
				this.filteredRecords = this.temp
			})
		}
	}

	checkedItem: {
		[key: string]: boolean;
	} = {}

	onCheckChanged(event) {
		this.checkedItem[event.source.value.toLowerCase()] = event.checked;
		this.filteredRecords = this.filterRecords();
	}

	filteredRecords: any[] = [];
	filterRecords() {
		let temp = [];
		let flag = 0;
		this.excelData = [];
		let storedRecords = [];
		let keys = Object.keys(this.checkedItem);
		for (let i in this.checkedItem) {
			if (this.checkedItem[i] == true) {
				let t = this.rows.filter((d) => {
					return d.channel.toLowerCase().indexOf(i.toLowerCase()) != -1
				});
				let p = this.excelData.filter((d) => {
					if (d.channel.toLowerCase().indexOf(i.toLowerCase()) != -1)
						return d.variableData;
				})
				storedRecords = storedRecords.concat(p)
				temp = temp.concat(t);
				flag = 1;
			}
		}
		this.excelData = storedRecords
		return temp;
	}



	public exportDataAsExcel() {
		let merge = [];
		this.exportData = [];
		for (let i = 0; i < this.filteredRecords.length; i++) {
			merge[i] = {};
			merge[i]['Sl No'] = this.filteredRecords[i]['slNo']
			merge[i]['Date'] = this.filteredRecords[i]['date']
			merge[i]['Channel'] = this.filteredRecords[i]['channel']
			merge[i]['Timespent'] = this.filteredRecords[i]['timeSpent']
			merge[i]['Timespan'] = this.filteredRecords[i]['timeSpan']
			merge[i]['Interactions']=this.filteredRecords[i]['noOfInteractions']
			//console.log(this.filteredRecords[i]['noOfInteractions'])
		}
		for (let i = 0; i < this.excelData.length; i++) {
			let test = Object.assign(merge[i], this.excelData[i].variableData)
			this.exportData.push(test)
		}
		//console.log("export")
		
		this.exportAsExcelFile(this.exportData, "excel data");
	}
	//********************************************************************************************************************************** */
	public exportAsExcelFile(json: any[], excelFileName: string): void {
		const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

		const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
		const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
		this.saveAsExcelFile(excelBuffer, excelFileName);
	}

	private saveAsExcelFile(buffer: any, fileName: string): void {
		const data: Blob = new Blob([buffer], {
			type: this.EXCEL_TYPE
		});
		let endDateStr = this.chosenEndDate.getFullYear() + "-" + (this.chosenEndDate.getMonth() + 1) + "-" + this.chosenEndDate.getDate();
		let startDateStr = (this.chosenStartDate.getMonth() == 0 ? this.chosenStartDate.getFullYear() - 1 : this.chosenStartDate.getFullYear()) + "-" + (this.chosenStartDate.getMonth() == -1 ? 12 : this.chosenStartDate.getMonth() + 1) + "-" + this.chosenStartDate.getDate();
		FileSaver.saveAs(data, this._data.businessName+"-"+this._data.chatFlowId + '-datadump-' + startDateStr + "--" + endDateStr + this.EXCEL_EXTENSION);
	}
	//************************************************************************************************************************************ */

}

export interface TableRow {
	slNo: number;
	date: string;
	channel: string;
	timeSpent: number;
	timeSpan:string;
	noOfInteractions:number;
}
