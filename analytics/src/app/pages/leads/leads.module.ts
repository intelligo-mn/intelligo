import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LeadsComponent } from "./leads.component";
import { SharedModule } from "../../shared/shared.module";
const LEADS_ROUTE = [{ path: "", component: LeadsComponent }];
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MyDateAdapter } from "../date-format"
import { DateAdapter, MatNativeDateModule, MatDatepicker, MatDatepickerModule, MAT_DATE_FORMATS } from "@angular/material";
const MY_DATE_FORMATS = {
	parse: {
		dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
	},
	display: {
		// dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
		dateInput: 'input',
		monthYearLabel: { year: 'numeric', month: 'short' },
		dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
		monthYearA11yLabel: { year: 'numeric', month: 'long' },
	}
};
@NgModule({
	declarations: [LeadsComponent],
	imports: [
		CommonModule,
		SharedModule,
		MatDatepickerModule,

		NgxDatatableModule,
		RouterModule.forChild(LEADS_ROUTE)
	],
	providers: [
		{ provide: DateAdapter, useClass: MyDateAdapter },
		{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
	]
})
export class LeadsModule {
	constructor(private dateAdapter: DateAdapter<Date>) {
		
		// dateAdapter.setLocale('nl');
	}
}
