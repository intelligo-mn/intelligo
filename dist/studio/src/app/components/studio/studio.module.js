"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const chatflow_component_1 = require("./chatflow/chatflow.component");
const nodeeditor_component_1 = require("./nodeeditor/nodeeditor.component");
const simulator_frame_component_1 = require("./simulator-frame/simulator-frame.component");
const landing_component_1 = require("./landing/landing.component");
const shared_module_1 = require("../../shared.module");
exports.STUDIO_ROUTES = [
    {
        path: "",
        component: landing_component_1.LandingComponent
    },
    {
        path: "designer",
        component: chatflow_component_1.ChatFlowComponent
    }
];
let StudioModule = class StudioModule {
};
StudioModule = __decorate([
    core_1.NgModule({
        declarations: [
            chatflow_component_1.ChatFlowComponent,
            nodeeditor_component_1.NodeEditorComponent,
            simulator_frame_component_1.SimulatorFrameComponent,
            landing_component_1.LandingComponent,
        ],
        entryComponents: [
            nodeeditor_component_1.NodeEditorComponent
        ],
        imports: [
            shared_module_1.SharedModule
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ]
    })
], StudioModule);
exports.StudioModule = StudioModule;
//# sourceMappingURL=studio.module.js.map