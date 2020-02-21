import { Component, OnInit } from "@angular/core"
import { DataService } from "../shared/services/data/data.service"
import { ActivatedRoute, Router } from "@angular/router"
import { MatDialog } from "@angular/material";
import { BasicDetailsComponent } from "app/shared/components/basic-details/basic-details.component";

@Component({
	selector: "app-base",
	templateUrl: "./base.component.html",
	styleUrls: ["./base.component.scss"]
})

export class BaseComponent implements OnInit {

	constructor(
		private _data: DataService,
		private route: ActivatedRoute,
		private router: Router,
		private dialog: MatDialog
	) {
		//console.log("Here");
		console.log(this.router.routerState.root.queryParams);

		this.route.queryParams.subscribe(params => {
			//console.log("Here");
			console.log(params);
            if (params['businessId'] && params['businessName'] && params['chatFlowId'] && params['apiBase']) {
                if (params['apiBase'].slice(-1) == "/")
                    this._data.apiBase = params['apiBase'].slice(0,-1);
                else
                    this._data.apiBase = params['apiBase'];
				this._data.businessId = params['businessId'];
				this._data.businessName = params['businessName'];
				this._data.chatFlowId = params['chatFlowId'];
				console.log(this._data.apiBase);
				console.log(this._data.businessId);
				console.log(this._data.businessName);
				console.log(this._data.chatFlowId);
				if((localStorage.getItem('businessId') && localStorage.getItem('businessId')!=this._data.businessId)
				 || (localStorage.getItem('chatFlowId') && localStorage.getItem('chatFlowId')!=this._data.chatFlowId))
				{
					localStorage.removeItem('businessId')
					localStorage.removeItem('chatFlowId')
					localStorage.removeItem('analyticsData')
					localStorage.removeItem('chatSessionsData')
					localStorage.removeItem('agentApiData')
					localStorage.removeItem('activeStats')
					localStorage.removeItem('activeChatDetails')
					localStorage.removeItem('goalNodes')
					localStorage.removeItem('goalNodeName')
					localStorage.removeItem('goalNodeData')
					localStorage.removeItem('goalNodeId')
					localStorage.removeItem('graphData')
					localStorage.removeItem('totalDetails')
					localStorage.removeItem('rowsData')  
				}
				localStorage.setItem('chatFlowId',this._data.chatFlowId)
				localStorage.setItem('businessId',this._data.businessId)
				this.router.navigateByUrl("/dashboards");
			} else {
				let l = this.dialog.open(BasicDetailsComponent, {
					width: 'auto'
				});
				l.afterClosed().subscribe(x => {
					if (x == true) {
						this.router.navigateByUrl("/dashboards");
					}
				});
			}
		});
	}
	ngOnInit() {
	}
}