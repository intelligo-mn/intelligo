import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';
import { SharedModule } from '../../shared/shared.module';
import { Ng2SearchPipeModule } from "ng2-search-filter";
//import {ChatService} from"./chat.service";
import { DataService } from "../../shared/services/data/data.service";
import {StompService} from "../../shared/services/config/stomp.service"
const CHAT_ROUTE = [
    { path: '', component: ChatComponent },
];

@NgModule({
	  declarations: [ChatComponent],
    imports: [
			CommonModule,
			SharedModule,
			Ng2SearchPipeModule,
			RouterModule.forChild(CHAT_ROUTE)
	],

	providers:[StompService,DataService]
  
})
export class ChatModule { }
