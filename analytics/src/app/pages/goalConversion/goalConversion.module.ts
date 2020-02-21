import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GoalConversionComponent } from './goalConversion.component';
import { SharedModule } from '../../shared/shared.module';
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





//import { ChartistLineComponent } from "../../shared/components/charts/chartist/chartist-line/chartist-line.component";
//import { ChartistLinesComponent } from "../../shared/components/charts/chartist/chartist-lines/chartist-lines.component";
//import { ChartistBarsComponent } from "../../shared/components/charts/chartist/chartist-bars/chartist-bars.component";
//import { ImageOverCardComponent } from "../../shared/components/cards/image-over-card/image-over-card.component";
//import { ContactsCardComponent } from "../../shared/components/cards/contacts-card/contacts-card.component";
//import { TodoComponent } from "../../shared/components/todo/todo.component";
//import { TaskComponent } from "../../shared/components/todo/task.component";
const ANALYTICS_ROUTE = [
    { path: '', component: GoalConversionComponent },
];

@NgModule({
    declarations: [
        GoalConversionComponent,

        //			ChartistLineComponent,
        //			ChartistLinesComponent,
        //			ChartistBarsComponent,
        //			ImageOverCardComponent,
        //			ContactsCardComponent,
        //			TodoComponent,
        //	    TaskComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatDatepickerModule,
        RouterModule.forChild(ANALYTICS_ROUTE)
    ],
	providers: [
		{ provide: DateAdapter, useClass: MyDateAdapter },
		{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
	]

})
export class GoalConversionModule { }
