import { Component, OnInit } from "@angular/core"
import { DataService } from "../../shared/services/data/data.service"

@Component({
    selector: "agent-dashboard",
    templateUrl: "./agentdashboard.component.html",
    styleUrls: ["./agentdashboard.component.scss"]
})

export class AgentDashboardComponent implements OnInit {
    loading: boolean=true;
    errorMsg: boolean;

    dataLoading=false;
    activeChatDetails = {}
    activeStats = {}
    constructor(private _data: DataService) {

    }
    ngOnInit() {
        if(localStorage.getItem('activeChatDetails'))
        {
         this.activeChatDetails=JSON.parse(localStorage.getItem('activeChatDetails'))   
         this._data.getActiveUsersAndAgents().subscribe(resData => {
             this.loading=false;
            this.activeChatDetails = (resData)
            localStorage.setItem('activeChatDetails',JSON.stringify(resData))
        },error=>{
            if(localStorage.getItem('activeChatDetails'))
            {
                this.activeChatDetails=JSON.parse(localStorage.getItem('activeChatDetails'))
                this.loading=false;
                this.errorMsg=true;
            }
            else
            {
                this.loading=false;
                this.errorMsg=false;
            }
            
        })
        }
        else
        {
            this._data.getActiveUsersAndAgents().subscribe(resData => {

                if(resData==null || Object.keys(resData).length==0 || resData.length==0)
                {
                  this.errorMsg=false
                  this.loading=false;
                }
                else
                {
                this.loading=false;
                this.errorMsg=true;
                this.activeChatDetails = (resData)
                localStorage.setItem('activeChatDetails',JSON.stringify(resData))
                }
            },error=>{
                if(localStorage.getItem('activeChatDetails'))
                {
                    this.activeChatDetails=JSON.parse(localStorage.getItem('activeChatDetails'))
                    this.loading=false;
                    this.errorMsg=true;
                }
                else
                {
                    this.loading=false;
                    this.errorMsg=false;
                }
               
            })
        }
        if(localStorage.getItem('activeStats'))
        {
            this.activeStats=JSON.parse(localStorage.getItem('activeStats'))
            this._data.getStatsForChatSession().subscribe(resData => {
                if(resData==null || Object.keys(resData).length==0 || resData.length==0)
                {
                  this.errorMsg=false
                  this.loading=false;
                }
                else
                {
                    this.loading=false;
                    this.errorMsg=true
                this.activeStats = (resData)
                localStorage.setItem('activeStats',JSON.stringify(resData))
                }
            },error=>{
                if(localStorage.getItem('activeStats'))
                {
                    this.activeStats=JSON.parse(localStorage.getItem('activeStats'))
                    this.loading=false;
                    this.errorMsg=true;
                }
                else
                {
                    this.loading=false;
                    this.errorMsg=false;
                }
               
            })
        }
        else{
            this._data.getStatsForChatSession().subscribe(resData => {
                if(resData==null || Object.keys(resData).length==0 || resData.length==0)
                {
                  this.errorMsg=false
                  this.loading=false;
                }
                else
                {
                    this.loading=false;
                    this.errorMsg=true
                this.activeStats = (resData)
                localStorage.setItem('activeStats',JSON.stringify(resData))
                }
            },error=>{
                if(localStorage.getItem('activeStats'))
                {
                    this.activeStats=JSON.parse(localStorage.getItem('activeStats'))
                    this.loading=false;
                    this.errorMsg=true;
                }
                else
                {
                    this.loading=false;
                    this.errorMsg=false;
                }
            })
        }
        this.dataLoading=true
    }

    refresh()
    {
        this.loading=true;
        this._data.getStatsForChatSession().subscribe(resData => {
            if(resData==null || Object.keys(resData).length==0 || resData.length==0)
            {
              this.errorMsg=false
            }
            else
            {
                this.errorMsg=true
            this.activeStats = (resData)
            localStorage.setItem('activeStats',JSON.stringify(resData))
            }
        },error=>{
            this.activeStats=JSON.parse(localStorage.getItem('activeStats'))
            this.loading=false;
            this.errorMsg=false;
        })

        this._data.getActiveUsersAndAgents().subscribe(resData => {
            
                            if(resData==null || Object.keys(resData).length==0 || resData.length==0)
                            {
                              this.errorMsg=false
                              this.loading=false;
                            }
                            else
                            {
                            this.errorMsg=true
                            this.activeChatDetails = (resData)
                            localStorage.setItem('activeChatDetails',JSON.stringify(resData))
                            this.loading=false;
                            }
                        },error=>{
                            this.activeChatDetails=JSON.parse(localStorage.getItem('activeChatDetails'))
                            this.loading=false;
                            this.errorMsg=false;
                        })
                      
    }

}