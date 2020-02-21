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
const Observable_1 = require("rxjs/Observable");
let TabsPillsComponent = class TabsPillsComponent {
    constructor() {
        this.currentJustify = 'justified';
        this.justifyRight = "end";
        this.verticalOrientation = 'vertical';
        this.horizontalOrientation = "horizontal";
        this.tabLinks = [
            { label: 'Sun', link: 'sunny-tab' },
            { label: 'Rain', link: 'rainy-tab' },
            { label: 'Fog', link: 'foggy-tab' },
        ];
        this.tabs = [
            {
                label: 'Tab 1',
                content: 'This is the body of the first tab'
            }, {
                label: 'Tab 2',
                disabled: true,
                content: 'This is the body of the second tab'
            }, {
                label: 'Tab 3',
                extraContent: true,
                content: 'This is the body of the third tab'
            }, {
                label: 'Tab 4',
                content: 'This is the body of the fourth tab'
            },
        ];
        this.activeTabIndex = 0;
        this.addTabPosition = 0;
        this.gotoNewTabAfterAdding = false;
        this.createWithLongContent = false;
        this.dynamicTabs = [
            {
                label: 'Tab 1',
                content: 'This is the body of the first tab'
            }, {
                label: 'Tab 2',
                disabled: true,
                content: 'This is the body of the second tab'
            }, {
                label: 'Tab 3',
                extraContent: true,
                content: 'This is the body of the third tab'
            }, {
                label: 'Tab 4',
                content: 'This is the body of the fourth tab'
            },
        ];
        this.asyncTabs = Observable_1.Observable.create((observer) => {
            setTimeout(() => {
                observer.next(this.tabs);
            }, 1000);
        });
    }
    addTab(includeExtraContent) {
        this.dynamicTabs.splice(this.addTabPosition, 0, {
            label: 'New Tab ' + (this.dynamicTabs.length + 1),
            content: 'New tab contents ' + (this.dynamicTabs.length + 1),
            extraContent: includeExtraContent
        });
        if (this.gotoNewTabAfterAdding) {
            this.activeTabIndex = this.addTabPosition;
        }
    }
    deleteTab(tab) {
        this.dynamicTabs.splice(this.dynamicTabs.indexOf(tab), 1);
    }
    swapTabLinks() {
        const temp = this.tabLinks[0];
        this.tabLinks[0] = this.tabLinks[1];
        this.tabLinks[1] = temp;
    }
    addToLabel() {
        this.tabLinks.forEach(link => link.label += 'extracontent');
    }
};
TabsPillsComponent = __decorate([
    core_1.Component({
        selector: '.content_inner_wrapper',
        templateUrl: './tabs-pills.component.html',
        styleUrls: ['./tabs-pills.component.scss']
    }),
    __metadata("design:paramtypes", [])
], TabsPillsComponent);
exports.TabsPillsComponent = TabsPillsComponent;
//# sourceMappingURL=tabs-pills.component.js.map