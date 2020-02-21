import {
  Component,
  ViewEncapsulation,
  OnInit,
} from "@angular/core";
import { DataService } from "../../shared/services/data/data.service"

@Component({
  selector: ".content_inner_wrapper",
  templateUrl: "./dashboards.component.html",
  styleUrls: ["./dashboards.component.scss"],
  encapsulation: ViewEncapsulation.Emulated
})
export class DashboardsComponent implements OnInit {
  node: boolean = true;
  loading: boolean = true;
  errorMsg1: boolean = true;
  active: boolean = false;
  data: any = {
    "totalUsers": 0,
    "totalSessions": 0,
    "totalInteractions":0,
    "channelwiseTotalUsers": {
      "WEB": 0
    },
    "activeUsers": 0,
    "channelwiseRecentUsers": {
      "WEB": 0
    }
  };
  nodeChannels = [];
  activeChannels = []

  constructor(private _data: DataService) {

  }

  ngOnInit() {
    if (localStorage.getItem('totalDetails')) {
      this.loading = true
      this.data = JSON.parse(localStorage.getItem('totalDetails'))
      if (this.data) {
        this.checkForChannels(this.data)
      }
    }
    this.apiCall()
  }

  refresh() {
    this.loading = true;
    this.apiCall()
  }

  checkForChannels(data)
  {
    if (this.data.channelwiseTotalUsers) {
      this.nodeChannels = Object.keys(this.data.channelwiseTotalUsers)
      this.node = true;
    }
    else {
      this.node = false;
    }
    if (this.data.channelwiseRecentUsers) {
      this.activeChannels = Object.keys(this.data.channelwiseRecentUsers)
      this.active = true
    }
    else {
      this.active = false;
    }
  }

  apiCall() {
    this._data.getDetails().subscribe(resData => {
      if (resData == null || Object.keys(resData).length == 0 || resData.length == 0) {
        this.loading = false;
        this.errorMsg1 = false;
        return;
      }
      else {
        this.errorMsg1 = true
        localStorage.setItem("totalDetails", JSON.stringify(resData))
        this.data = (resData);
        this.checkForChannels(this.data)
        this.loading = false;
      }
    }, error => {
      if(localStorage.getItem('totalDetails'))
      {
        this.data=JSON.parse(localStorage.getItem('totalDetails'))
        this.loading = false;
        this.active = true;
        this.node = true;
      }
      else
      {
        this.loading = false;
        this.active = false;
        this.node = false;
      }
      
    })
  }

}
