"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const bot_list_component_1 = require("./bot-list/bot-list.component");
const bot_detail_component_1 = require("./bot-detail/bot-detail.component");
const router_1 = require("@angular/router");
const routes = [
    {
        path: 'list',
        component: bot_list_component_1.BotListComponent
    },
    {
        path: 'detail',
        component: bot_detail_component_1.BotDetailComponent
    }
];
let MarketModule = class MarketModule {
};
MarketModule = __decorate([
    core_1.NgModule({
        declarations: [bot_list_component_1.BotListComponent, bot_detail_component_1.BotDetailComponent],
        imports: [
            common_1.CommonModule,
            router_1.RouterModule.forChild(routes),
        ]
    })
], MarketModule);
exports.MarketModule = MarketModule;
//# sourceMappingURL=market.module.js.map