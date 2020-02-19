import { Component, OnInit, ViewEncapsulation, OnChanges, OnDestroy } from '@angular/core';
import * as shape from 'd3-shape';
import { colorSets } from './color-sets';
// import { GraphComponent } from "@swimlane/ngx-graph/src/graph/graph.component"
import { countries, generateHierarchialGraph, getTurbineData } from './data';
import chartGroups from './chartTypes';
import { id } from './id';
import { DataService } from "../../shared/services/data/data.service"

@Component({
  selector: 'graph-view',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./graphview.component1.scss'],
  templateUrl: './graphview.component1.html'
})
export class GraphViewComponent implements OnInit {


  endDateStr:any
  startDateStr: any;
  panX: number = 100;
  panY:number=50;
  Style="Style 1"
  zoomLevel: number = 1;
  zoomSpeed: number = 0.05;
  minZoomLevel: number = 0.1;
  maxZoomLevel: number = 4.0;
  fitscreen = true;
  width = 1500;
  height = 620;
  chosenEndDate: Date;
  chosenStartDate: Date;
//  nodes:any;
  //links:any;
  links: {
    source: string;
    target: string;
    label: string;
    completeLabel: string;
    numberOfClicks: number;
  }[] = []
  nodes: {
    id: string;
    label: string;
    nodeType: string;
    completeLabel: string;
    numberOfViews: number;
    numberOfClicks: number;
    numberOfUsers: number;
    numberOfSessions: number;
    averageTimeSpent: number;
    isGoalNode: boolean;
    isStartNode: boolean;
  }[] = [];
  nodesData: any;
  graphData: any;
  loading: boolean;
  errorMsg: boolean = true;
  //   version = APP_VERSION;

  orientationString = "Left to Right";
  orientations = ["Left to Right", "Top to Bottom"]
  theme = 'dark';
  chartType = 'directed-graph';
  chartGroups: any;
  chart: any;
  realTimeData: boolean = false;
  countries: any[];
  graph: { links: any[], nodes: any[] };
  hierarchialGraph: { links: any[], nodes: any[] };

  view: any[];
  //width: number = 700;
  //height: number = 300;
  fitContainer: boolean = true;
  autoZoom: boolean = true;

  // options
  showLegend = false;
  orientation: string = 'LR'; // LR, RL, TB, BT

  // line interpolation
  curveType: string = 'Style 1';
  curve: any = shape.curveBundle;
  //   interpolationTypes = [
  //     'Bundle', 'Cardinal', 'Catmull Rom','Catmull Rom Closed', 'Linear', 'Monotone X',
  //     'Monotone Y', 'Natural', 'Step', 'Step After', 'Step Before'
  //   ];
  interpolationTypes = [
    'Style 1', 'Style 2', 'Style 3',
  ];

  colorSets: any;
  colorScheme: any;
  schemeType: string = 'ordinal';
  selectedColorScheme: string;

  constructor(private _data: DataService) {
    //console.log("constructor")
    Object.assign(this, {
      countries,
      colorSets,
      chartGroups,
      hierarchialGraph: getTurbineData(),
    });

    this.setColorScheme('picnic');
    this.setInterpolationType('Bundle');
  }

  setInterpolationType(curveType) {
    this.curveType = curveType;
    if (curveType === 'Style 1') {
      this.curve = shape.curveBundle;
    }

    if (curveType === 'Style 2') {
      this.curve = shape.curveLinear;
    }

    if (curveType === 'Style 3') {
      this.curve = shape.curveMonotoneY; 
    }

  }
  setOrientation(event) {
  //  console.log(event)
    if (event == "Top to Bottom") {
      this.orientation = "TB"
    }
    if (event == "Left to Right") {
      this.orientation = "LR"
    }

  }

  getInitialDate() {
    let startDate = new Date()
    let endDate = new Date()
    startDate.setMonth(startDate.getMonth() - 1 == -1 ? 12 : startDate.getMonth() - 1)
    let tempEndDate = new Date(endDate);
    tempEndDate.setDate(tempEndDate.getDate() + 1);
    this.endDateStr = tempEndDate.getFullYear() + "-" + ((tempEndDate.getMonth() + 1) < 10 ? ('0' + (tempEndDate.getMonth() + 1)) : tempEndDate.getMonth() + 1) + "-" + (tempEndDate.getDate() < 10 ? '0' + tempEndDate.getDate() : tempEndDate.getDate());
    this.startDateStr = (endDate.getMonth() - 1 == -1 ? endDate.getFullYear() - 1 : endDate.getFullYear()) + "-" + (endDate.getMonth() - 1 == -1 ? 12 : (endDate.getMonth() + 1 < 10 ? ('0' + (endDate.getMonth())) : endDate.getMonth())) + "-" + (endDate.getDate() < 10 ? '0' + endDate.getDate() : endDate.getDate());
    this.chosenStartDate = startDate
    this.chosenEndDate = endDate
}
getChosenDate() {
    let tempEndDate = new Date(this.chosenEndDate);
    tempEndDate.setDate(tempEndDate.getDate() + 1);
    this.endDateStr = tempEndDate.getFullYear() + "-" + (tempEndDate.getMonth() + 1 < 10 ? ('0' + (tempEndDate.getMonth() + 1)) : tempEndDate.getMonth() + 1) + "-" + (tempEndDate.getDate() < 10 ? '0' + tempEndDate.getDate() : tempEndDate.getDate());
    let month = this.chosenStartDate.getMonth() + 1
    let day = this.chosenStartDate.getDate()
    this.startDateStr = (this.chosenStartDate.getFullYear()) + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day);
}



  ngOnInit() {

    this.getInitialDate()
    this.view = [this.width, this.height];
    this.selectChart(this.chartType);
  
    this.loading = true;
    if(localStorage.getItem('graphData'))
    {
      this.graphData=JSON.parse(localStorage.getItem('graphData'))
      this.getGraphData()
    }
    this.apiCall(this.startDateStr, this.endDateStr)
    console.log(this.links)
    
  }

  apiCall(startDateStr, endDateStr) {
    this._data.getBehaviourFlow(startDateStr, endDateStr).subscribe(resData => {
      if (resData == null || resData.length == 0 || Object.keys(resData).length == 0) {
        this.loading = false;
        this.errorMsg = false;
        //console.log(this.errorMsg)
        return

      }
      localStorage.setItem('graphData',JSON.stringify(resData))
      this.graphData = resData
      this.getGraphData()
      this.loading = false;
      this.errorMsg = true
    }, error => {
      if(localStorage.getItem('graphData'))
      {
        this.loading=false;
        this.errorMsg=true
        this.graphData=JSON.parse(localStorage.getItem('graphData'))
        this.getGraphData()
      }
      else
      {
        this.loading = false
        this.errorMsg = false
      }
     
    })
  }


  getGraphData()
  {
    this.nodesData = this.graphData['nodes'];
    let node=[]
    for (let i = 0; i < this.nodesData.length; i++) {
      node[i] = {
        id: "",
        label: "",
        nodeType: "",
        numberOfViews: 0,
        completeLabel: "",
        numberOfClicks: 0,
        numberOfUsers: 0,
        numberOfSessions: 0,
        averageTimeSpent: 0,
        isGoalNode: false,
        isStartNode: false
      }
      node[i].id = this.nodesData[i].nodeId;
      node[i].label = this.nodesData[i].nodeName.substring(0, 20);
      node[i].nodeType = this.nodesData[i].nodeType;
      node[i].completeLabel = this.nodesData[i].nodeName;
      node[i].numberOfClicks = this.nodesData[i].numberOfClicks;
      node[i].numberOfViews = this.nodesData[i].numberOfViews;
      node[i].numberOfUsers = this.nodesData[i].numberOfUsers;
      node[i].numberOfSessions = this.nodesData[i].numberOfSessions;
      node[i].averageTimeSpent = this.nodesData[i].averageTimeSpent;
      node[i].isStartNode = this.nodesData[i].isStartNode;
      node[i].isGoalNode = this.nodesData[i].isGoalNode;
    }
    this.nodes=node;
    let linkData: {
      source: string;
      target: string;
      label: string;
      completeLabel: string;
      numberOfClicks: number;
    }[] = []
    let link = []
    for (let i = 0; i < this.graphData['links'].length; i++) {
      link[i] = {
        source: "",
        target: "",
        label: "",
        completeLabel: "",
        numberOfClicks: 0,
      }

      link[i].source = this.graphData['links'][i].source
      link[i].target = this.graphData['links'][i].target
      link[i].completeLabel = this.graphData['links'][i].label
      link[i].label = this.graphData['links'][i].label
      link[i].numberOfClicks = this.graphData['links'][i].numberOfClicks
    }
    this.links = link;
  }
  updateData() {
    if (!this.realTimeData) {
      return;
    }

    const country = this.countries[Math.floor(Math.random() * this.countries.length)];
    const add = Math.random() < 0.7;
    const remove = Math.random() < 0.5;

    if (add) {
      // directed graph
      const hNode = {
        id: id(),
        label: country
      };

      this.hierarchialGraph.nodes.push(hNode);

      this.hierarchialGraph.links.push({
        source: this.hierarchialGraph.nodes[Math.floor(Math.random() * (this.hierarchialGraph.nodes.length - 1))].id,
        target: hNode.id,
        label: 'on success'
      });

      this.hierarchialGraph.links = [...this.hierarchialGraph.links];
      this.hierarchialGraph.nodes = [...this.hierarchialGraph.nodes];
    }
  }

  applyDimensions() {
    this.view = [this.width, this.height];
  }

  toggleFitContainer(fitContainer: boolean, autoZoom: boolean): void {
    this.fitContainer = fitContainer;
    this.autoZoom = autoZoom;

    if (this.fitContainer) {
      this.view = undefined;
    } else {
      this.applyDimensions();
    }
  }

  selectChart(chartSelector) {
    this.chartType = chartSelector;

    for (const group of this.chartGroups) {
      for (const chart of group.charts) {
        if (chart.selector === chartSelector) {
          this.chart = chart;
          return;
        }
      }
    }
  }

  select(data) {
    //console.log('Item clicked', data);
  }

  setColorScheme(name) {
    this.selectedColorScheme = name;
    this.colorScheme = this.colorSets.find(s => s.name === name);
  }



  onLegendLabelClick(entry) {
    //console.log('Legend clicked', entry);
  }

  fitToScreen(event) {
    this.autoZoom = true;
    if (this.fitscreen) {
      this.fitscreen = false
    }
    else {
      this.fitscreen = true
    }
  }

  fitToNormal(event) {
    this.autoZoom = false;
    this.zoomLevel = 1
    if (this.fitscreen) {
      this.fitscreen = false
    }
    else {
      this.fitscreen = true
    }
  }

  refresh() {
   this.getChosenDate()
    //let startDateStr=(this.chosenStartDate.getMonth()==0?this.chosenStartDate.getFullYear()-1:this.chosenStartDate.getFullYear())+"-"+(this.chosenStartDate.getMonth()==-1?12:this.chosenStartDate.getMonth()+1)+"-"+this.chosenStartDate.getDate();
    this.apiCall(this.startDateStr, this.endDateStr)

  }

  onClick(event) {
   
    this.getChosenDate()
    //////console.log(startDateStr + " " + endDateStr)
    this.apiCall(this.startDateStr, this.endDateStr)
  }

  onZoom(event, direction): void {
    this.autoZoom = false;
    if (direction === 'in') {
      this.zoomLevel += this.zoomSpeed;
      ////console.log(this.zoomLevel)
    } else {
      this.zoomLevel -= this.zoomSpeed;
    }

    this.zoomLevel = Math.max(this.zoomLevel, this.minZoomLevel);
    this.zoomLevel = Math.min(this.zoomLevel, this.maxZoomLevel);

    if (this.fitscreen) {

      this.fitscreen = false
    }
    else {
      this.fitscreen = true
    }

  }


  toggleExpand(node) {
    ////console.log('toggle expand', node);
  }

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

