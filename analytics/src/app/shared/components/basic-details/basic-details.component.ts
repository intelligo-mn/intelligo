import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'app/shared/services/data/data.service';

@Component({
	selector: 'app-basic-details',
	templateUrl: './basic-details.component.html',
	styleUrls: ['./basic-details.component.scss']
})
export class BasicDetailsComponent implements OnInit {

	constructor(
		private dataService: DataService,
		private dialog: MatDialog,
		private dialogRef: MatDialogRef<BasicDetailsComponent>,
		@Optional()
		@Inject(MAT_DIALOG_DATA)
		public param: any) {
		let d = localStorage.getItem('b_details');
		if (d) {
			this.details = JSON.parse(d);
		}
	}

	ngOnInit() {
	}

	details: BasicDetails = {
		apiBase: "",
		businessId: "",
		businessName: ""
	};
	error: string;
	done() {
		if (this.details.apiBase && this.details.businessId && this.details.businessName) {
			this.error = null;
			this.dataService.apiBase = this.details.apiBase;
			this.dataService.businessId = this.details.businessId;
			this.dataService.businessName = this.details.businessName;
			this.dataService.chatFlowId = this.details.businessId;
			localStorage.setItem('b_details', JSON.stringify(this.details));
			this.dialogRef.close(true);
		} else {
			this.error = "Please fill all the details";	
		}
	}
}

export interface BasicDetails {
	apiBase: string;
	businessId: string;
	businessName: string;
}

