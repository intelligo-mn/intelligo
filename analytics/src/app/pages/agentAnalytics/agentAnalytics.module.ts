import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgentAnalyticsComponent } from './agentAnalytics.component';
import { SharedModule } from '../../shared/shared.module';
//import { DatePickerModule } from 'ng2-datepicker';



//import { ChartistLineComponent } from "../../shared/components/charts/chartist/chartist-line/chartist-line.component";
//import { ChartistLinesComponent } from "../../shared/components/charts/chartist/chartist-lines/chartist-lines.component";
//import { ChartistBarsComponent } from "../../shared/components/charts/chartist/chartist-bars/chartist-bars.component";
//import { ImageOverCardComponent } from "../../shared/components/cards/image-over-card/image-over-card.component";
//import { ContactsCardComponent } from "../../shared/components/cards/contacts-card/contacts-card.component";
//import { TodoComponent } from "../../shared/components/todo/todo.component";
//import { TaskComponent } from "../../shared/components/todo/task.component";
const AGENT_ANALYTICS_ROUTE = [
    { path: '', component: AgentAnalyticsComponent },
];

@NgModule({
    declarations: [
        AgentAnalyticsComponent,

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
        //DatePickerModule,
        RouterModule.forChild(AGENT_ANALYTICS_ROUTE)
    ]

})
export class AgentAnalyticsModule { }
