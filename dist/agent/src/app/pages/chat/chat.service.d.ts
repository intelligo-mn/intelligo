import { Http } from "@angular/http";
import "rxjs/add/operator/map";
export declare class ChatService {
    private http;
    constructor(http: Http);
    getChatDetails(): import("rxjs").Observable<() => any>;
}
