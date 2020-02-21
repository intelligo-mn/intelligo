import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GraphViewComponent } from './graphview.component1';
import { SharedModule } from '../../shared/shared.module';
import { NgxGraphModule } from "@swimlane/ngx-graph"
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

const GRAPH_ROUTE = [
    { path: '', component: GraphViewComponent },
];

@NgModule({
	  declarations: [
		GraphViewComponent,
			   
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
	  NgxGraphModule,
	  MatDatepickerModule,
	  
			//DatePickerModule,
			RouterModule.forChild(GRAPH_ROUTE)
    ],
	providers: [
		{ provide: DateAdapter, useClass: MyDateAdapter },
		{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
	]
  
})
export class GraphViewModule { }









// //import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { NgxGraphModule } from "@swimlane/ngx-graph"
// //import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// //import { TooltipModule } from "ngx-tooltip"
// import { GraphViewComponent } from './graphview.component';



// @NgModule({
//   declarations: [
//     GraphViewComponent
//   ],
//   imports: [
//   //  HttpModule,
//    // BrowserModule,
//     //TooltipModule,
//     NgxGraphModule,
//    // NgbModule.forRoot(),
//   //  NoopAnimationsModule,
//   ]
// })
// export class GraphViewModule { }
