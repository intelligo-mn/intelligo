import { Http, Headers, Response, Jsonp, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";
import { startOfDay } from "date-fns";
@Injectable()
export class DataService {
  apiBase: string = "";
  businessId: string = "";
  businessName: string = ""
  chatFlowId: string = ""
  constructor(private http: Http) { }

  getDetails() {
    return this.http.get(`${this.apiBase}/api/Analyzer/GetLiveStats?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}`).map(res => res.json())
  }

  getDetailsNew(startDate?: string, endDate?: string) {
    if (startDate && endDate) {
      return this.http.get(`${this.apiBase}/api/Analyzer/GetNodeStats?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}&startDate=${startDate}&endDate=${endDate}`).map(res => res.json())
    }
    else {
      return this.http.get(`${this.apiBase}/api/Analyzer/GetNodeStats?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}`).map(res => res.json())
    }

  };

  getGoalNodeDetails() {
    return this.http.get(`${this.apiBase}/api/Analyzer/GetGoalNodes?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}`).map(res => res.json())
  }
  getGoalNodeData(goalNode: string, startDate?: string, endDate?: string) {
    if (startDate && endDate) {
      return this.http.get(`${this.apiBase}/api/Analyzer/GetGoalNodeStats?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}&goalNodeId=${goalNode}&startDate=${startDate}&endDate=${endDate}`).map(res => res.json())
    }
    else {
      return this.http.get(`${this.apiBase}/api/Analyzer/GetGoalNodeStats?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}&goalNodeId=${goalNode}`).map(res => res.json())
    }

  }
  getActiveUsersAndAgents() {
    return this.http.get(`${this.apiBase}/api/AgentAnalyzer/GetActiveUsersAndAgents?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}`).map(res => res.json())
  }
  getStatsForChatSession() {
    return this.http.get(`${this.apiBase}/api/AgentAnalyzer/GetStatsForChatSession?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}`).map(res => res.json())
  }
  getNumberOfUsersAndChatSessions() {
    return this.http.get(`${this.apiBase}/api/AgentAnalyzer/GetNumberOfUsersAndChatSessionsPerAgent?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}`).map(res => res.json())
  }
  getNumberOfChatSessions() {
    return this.http.get(`${this.apiBase}/api/AgentAnalyzer/GetNumberOfChatSessionsPerDay?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}`).map(res => res.json())
  }
  getUsersData(startDate?: string, endDate?: string) {
    // console.log(startDate)
    // console.log(endDate)
    if (startDate && endDate)
      return this.http.get(`${this.apiBase}/api/Analyzer/GetUsersData?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}&businessName=${this.businessName}&startDate=${startDate}&endDate=${endDate}`).map(res => res.json() as UserDataItem[])
    else
      return this.http.get(`${this.apiBase}/api/Analyzer/GetUsersData?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}&businessName=${this.businessName}`).map(res => res.json() as UserDataItem[])
  }
  getBehaviourFlow(startDate?: string, endDate?: string) {
    if (startDate && endDate) {
      return this.http.get(`${this.apiBase}/api/Analyzer/GetBehaviorFlow?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}&startDate=${startDate}&endDate=${endDate}`).map(res => res.json())
    }
    else {
      return this.http.get(`${this.apiBase}/api/Analyzer/GetBehaviorFlow?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}`).map(res => res.json())
    }

  }

}

export interface UserDataItem {
  slNo: number;
  date: string;
  channel: string;
  timeSpent: number;
  timeSpan:string;
  noOfInteractions:number;
  variableData: {
    [key: string]: string
  };
}
