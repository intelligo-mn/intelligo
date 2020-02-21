"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shape = require("d3-shape");
const color_sets_1 = require("./color-sets");
const data_1 = require("./data");
const chartTypes_1 = require("./chartTypes");
const id_1 = require("./id");
const data_service_1 = require("../../shared/services/data/data.service");
let GraphViewComponent = class GraphViewComponent {
    constructor(_data) {
        this._data = _data;
        this.panX = 100;
        this.panY = 50;
        this.Style = "Style 1";
        this.zoomLevel = 1;
        this.zoomSpeed = 0.05;
        this.minZoomLevel = 0.1;
        this.maxZoomLevel = 4.0;
        this.fitscreen = true;
        this.width = 1500;
        this.height = 620;
        this.links = [];
        this.nodes = [];
        this.errorMsg = true;
        this.orientationString = "Left to Right";
        this.orientations = ["Left to Right", "Top to Bottom"];
        this.theme = 'dark';
        this.chartType = 'directed-graph';
        this.realTimeData = false;
        this.fitContainer = true;
        this.autoZoom = true;
        this.showLegend = false;
        this.orientation = 'LR';
        this.curveType = 'Style 1';
        this.curve = shape.curveBundle;
        this.interpolationTypes = [
            'Style 1', 'Style 2', 'Style 3',
        ];
        this.schemeType = 'ordinal';
        Object.assign(this, {
            countries: data_1.countries,
            colorSets: color_sets_1.colorSets,
            chartGroups: chartTypes_1.default,
            hierarchialGraph: data_1.getTurbineData(),
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
        if (event == "Top to Bottom") {
            this.orientation = "TB";
        }
        if (event == "Left to Right") {
            this.orientation = "LR";
        }
    }
    getInitialDate() {
        let startDate = new Date();
        let endDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1 == -1 ? 12 : startDate.getMonth() - 1);
        let tempEndDate = new Date(endDate);
        tempEndDate.setDate(tempEndDate.getDate() + 1);
        this.endDateStr = tempEndDate.getFullYear() + "-" + ((tempEndDate.getMonth() + 1) < 10 ? ('0' + (tempEndDate.getMonth() + 1)) : tempEndDate.getMonth() + 1) + "-" + (tempEndDate.getDate() < 10 ? '0' + tempEndDate.getDate() : tempEndDate.getDate());
        this.startDateStr = (endDate.getMonth() - 1 == -1 ? endDate.getFullYear() - 1 : endDate.getFullYear()) + "-" + (endDate.getMonth() - 1 == -1 ? 12 : (endDate.getMonth() + 1 < 10 ? ('0' + (endDate.getMonth())) : endDate.getMonth())) + "-" + (endDate.getDate() < 10 ? '0' + endDate.getDate() : endDate.getDate());
        this.chosenStartDate = startDate;
        this.chosenEndDate = endDate;
    }
    getChosenDate() {
        let tempEndDate = new Date(this.chosenEndDate);
        tempEndDate.setDate(tempEndDate.getDate() + 1);
        this.endDateStr = tempEndDate.getFullYear() + "-" + (tempEndDate.getMonth() + 1 < 10 ? ('0' + (tempEndDate.getMonth() + 1)) : tempEndDate.getMonth() + 1) + "-" + (tempEndDate.getDate() < 10 ? '0' + tempEndDate.getDate() : tempEndDate.getDate());
        let month = this.chosenStartDate.getMonth() + 1;
        let day = this.chosenStartDate.getDate();
        this.startDateStr = (this.chosenStartDate.getFullYear()) + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day);
    }
    ngOnInit() {
        this.getInitialDate();
        this.view = [this.width, this.height];
        this.selectChart(this.chartType);
        this.loading = true;
        if (localStorage.getItem('graphData')) {
            this.graphData = JSON.parse(localStorage.getItem('graphData'));
            this.getGraphData();
        }
        this.apiCall(this.startDateStr, this.endDateStr);
        console.log(this.links);
    }
    apiCall(startDateStr, endDateStr) {
        this._data.getBehaviourFlow(startDateStr, endDateStr).subscribe(resData => {
            if (resData == null || resData.length == 0 || Object.keys(resData).length == 0) {
                this.loading = false;
                this.errorMsg = false;
                return;
            }
            localStorage.setItem('graphData', JSON.stringify(resData));
            this.graphData = resData;
            this.getGraphData();
            this.loading = false;
            this.errorMsg = true;
        }, error => {
            if (localStorage.getItem('graphData')) {
                this.loading = false;
                this.errorMsg = true;
                this.graphData = JSON.parse(localStorage.getItem('graphData'));
                this.getGraphData();
            }
            else {
                this.loading = false;
                this.errorMsg = false;
            }
        });
    }
    getGraphData() {
        this.nodesData = this.graphData['nodes'];
        let node = [];
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
            };
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
        this.nodes = node;
        let linkData = [];
        let link = [];
        for (let i = 0; i < this.graphData['links'].length; i++) {
            link[i] = {
                source: "",
                target: "",
                label: "",
                completeLabel: "",
                numberOfClicks: 0,
            };
            link[i].source = this.graphData['links'][i].source;
            link[i].target = this.graphData['links'][i].target;
            link[i].completeLabel = this.graphData['links'][i].label;
            link[i].label = this.graphData['links'][i].label;
            link[i].numberOfClicks = this.graphData['links'][i].numberOfClicks;
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
            const hNode = {
                id: id_1.id(),
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
    toggleFitContainer(fitContainer, autoZoom) {
        this.fitContainer = fitContainer;
        this.autoZoom = autoZoom;
        if (this.fitContainer) {
            this.view = undefined;
        }
        else {
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
    }
    setColorScheme(name) {
        this.selectedColorScheme = name;
        this.colorScheme = this.colorSets.find(s => s.name === name);
    }
    onLegendLabelClick(entry) {
    }
    fitToScreen(event) {
        this.autoZoom = true;
        if (this.fitscreen) {
            this.fitscreen = false;
        }
        else {
            this.fitscreen = true;
        }
    }
    fitToNormal(event) {
        this.autoZoom = false;
        this.zoomLevel = 1;
        if (this.fitscreen) {
            this.fitscreen = false;
        }
        else {
            this.fitscreen = true;
        }
    }
    refresh() {
        this.getChosenDate();
        this.apiCall(this.startDateStr, this.endDateStr);
    }
    onClick(event) {
        this.getChosenDate();
        this.apiCall(this.startDateStr, this.endDateStr);
    }
    onZoom(event, direction) {
        this.autoZoom = false;
        if (direction === 'in') {
            this.zoomLevel += this.zoomSpeed;
        }
        else {
            this.zoomLevel -= this.zoomSpeed;
        }
        this.zoomLevel = Math.max(this.zoomLevel, this.minZoomLevel);
        this.zoomLevel = Math.min(this.zoomLevel, this.maxZoomLevel);
        if (this.fitscreen) {
            this.fitscreen = false;
        }
        else {
            this.fitscreen = true;
        }
    }
    toggleExpand(node) {
    }
};
GraphViewComponent = __decorate([
    core_1.Component({
        selector: 'graph-view',
        encapsulation: core_1.ViewEncapsulation.None,
        styleUrls: ['./graphview.component1.scss'],
        templateUrl: './graphview.component1.html'
    }),
    __metadata("design:paramtypes", [data_service_1.DataService])
], GraphViewComponent);
exports.GraphViewComponent = GraphViewComponent;
//# sourceMappingURL=graphview.component1.js.map