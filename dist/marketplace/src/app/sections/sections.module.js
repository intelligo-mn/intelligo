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
const ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
const forms_1 = require("@angular/forms");
const ng2_nouislider_1 = require("ng2-nouislider");
const jw_bootstrap_switch_ng2_1 = require("jw-bootstrap-switch-ng2");
const router_1 = require("@angular/router");
const sections_component_1 = require("./sections.component");
const buttons_section_component_1 = require("./buttons-section/buttons-section.component");
const inputs_section_component_1 = require("./inputs-section/inputs-section.component");
const crs_section_component_1 = require("./crs-section/crs-section.component");
const navigation_section_component_1 = require("./navigation-section/navigation-section.component");
const tabs_section_component_1 = require("./tabs-section/tabs-section.component");
const alerts_section_component_1 = require("./alerts-section/alerts-section.component");
const typography_section_component_1 = require("./typography-section/typography-section.component");
const angular_section_component_1 = require("./angular-section/angular-section.component");
const nucleo_section_component_1 = require("./nucleo-section/nucleo-section.component");
const versions_section_component_1 = require("./versions-section/versions-section.component");
const modal_component_1 = require("./modal/modal.component");
const modal_component_2 = require("./modal/modal.component");
const integration_section_component_1 = require("./integration-section/integration-section.component");
let SectionsModule = class SectionsModule {
};
SectionsModule = __decorate([
    core_1.NgModule({
        declarations: [
            sections_component_1.SectionsComponent,
            buttons_section_component_1.ButtonsSectionComponent,
            inputs_section_component_1.InputsSectionComponent,
            crs_section_component_1.CrsSectionComponent,
            navigation_section_component_1.NavigationSectionComponent,
            tabs_section_component_1.TabsSectionComponent,
            alerts_section_component_1.AlertsSectionComponent,
            typography_section_component_1.TypographySectionComponent,
            angular_section_component_1.AngularSectionComponent,
            nucleo_section_component_1.NucleoSectionComponent,
            versions_section_component_1.VersionsSectionComponent,
            modal_component_1.NgbdModalComponent,
            integration_section_component_1.IntegrationSectionComponent,
            modal_component_2.NgbdModalContent
        ],
        entryComponents: [modal_component_2.NgbdModalContent],
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            ng_bootstrap_1.NgbModule,
            router_1.RouterModule,
            ng2_nouislider_1.NouisliderModule,
            jw_bootstrap_switch_ng2_1.JwBootstrapSwitchNg2Module
        ],
        exports: [sections_component_1.SectionsComponent, integration_section_component_1.IntegrationSectionComponent]
    })
], SectionsModule);
exports.SectionsModule = SectionsModule;
//# sourceMappingURL=sections.module.js.map