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
const Chartist = require("chartist");
let ChartistComponent = class ChartistComponent {
    constructor(element) {
        this.element = element.nativeElement;
    }
    ngOnInit() {
        if (!this.type || !this.data) {
            Promise.reject(`Expected at least type and data.`);
        }
        return this.renderChart().then(chart => {
            if (this.events !== undefined) {
                this.bindEvents(chart);
            }
            return chart;
        });
    }
    ngOnChanges(changes) {
        this.update(changes);
    }
    ngOnDestroy() {
        if (this.chart) {
            this.chart.detach();
        }
    }
    renderChart() {
        const promises = [this.type, this.element, this.data, this.options, this.responsiveOptions];
        return Promise.all(promises).then(values => {
            const [type, ...args] = values;
            if (!(type in Chartist)) {
                throw new Error(`${type} is not a valid chart type`);
            }
            this.chart = Chartist[type](...args);
            return this.chart;
        });
    }
    update(changes) {
        if (!this.chart || 'type' in changes) {
            this.renderChart();
        }
        else {
            if (changes['data']) {
                this.data = changes['data'].currentValue;
            }
            if (changes['options']) {
                this.options = changes['options'].currentValue;
            }
            this.chart.update(this.data, this.options);
        }
    }
    bindEvents(chart) {
        for (let event of Object.keys(this.events)) {
            chart.on(event, this.events[event]);
        }
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChartistComponent.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChartistComponent.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChartistComponent.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChartistComponent.prototype, "responsiveOptions", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChartistComponent.prototype, "events", void 0);
ChartistComponent = __decorate([
    core_1.Component({
        selector: 'x-chartist',
        template: '<ng-content></ng-content>'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ChartistComponent);
exports.ChartistComponent = ChartistComponent;
let ChartistModule = class ChartistModule {
};
ChartistModule = __decorate([
    core_1.NgModule({
        declarations: [ChartistComponent],
        exports: [ChartistComponent]
    })
], ChartistModule);
exports.ChartistModule = ChartistModule;
exports.default = {
    directives: [ChartistComponent]
};
//# sourceMappingURL=chartist.demo.js.map