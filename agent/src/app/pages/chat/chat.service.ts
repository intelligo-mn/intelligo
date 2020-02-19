import { Injectable, OnInit } from "@angular/core"
import { Http } from "@angular/http"
import "rxjs/add/operator/map"
@Injectable()

export class ChatService {

	constructor(private http: Http) { }

	getChatDetails() {
		return this.http.get("http://chatbotagents-alphav2.ap-southeast-1.elasticbeanstalk.com/api/agents/agent1/chats").map(res => res.json);
	}
}