"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const chat_component_1 = require("./chat.component");
const shared_module_1 = require("../../shared/shared.module");
const ng2_search_filter_1 = require("ng2-search-filter");
const data_service_1 = require("../../shared/services/data/data.service");
const stomp_service_1 = require("../../shared/services/config/stomp.service");
const CHAT_ROUTE = [
    { path: '', component: chat_component_1.ChatComponent },
];
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    core_1.NgModule({
        declarations: [chat_component_1.ChatComponent],
        imports: [
            common_1.CommonModule,
            shared_module_1.SharedModule,
            ng2_search_filter_1.Ng2SearchPipeModule,
            router_1.RouterModule.forChild(CHAT_ROUTE)
        ],
        providers: [stomp_service_1.StompService, data_service_1.DataService]
    })
], ChatModule);
exports.ChatModule = ChatModule;
//# sourceMappingURL=chat.module.js.map