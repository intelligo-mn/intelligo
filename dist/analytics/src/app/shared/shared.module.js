"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var SharedModule_1;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
const flex_layout_1 = require("@angular/flex-layout");
const material_1 = require("@angular/material");
const angular2_moment_1 = require("angular2-moment");
const ngx_charts_1 = require("@swimlane/ngx-charts");
const angular2_wizard_1 = require("angular2-wizard");
const ng2_validation_1 = require("ng2-validation");
const ngx_datatable_1 = require("@swimlane/ngx-datatable");
const ng2_dnd_1 = require("ng2-dnd");
const ng_chartist_1 = require("ng-chartist");
const ng2_charts_1 = require("ng2-charts");
const footer_component_1 = require("../layout/footer/footer.component");
const app_backdrop_component_1 = require("./components/app_backdrop/app_backdrop.component");
const profile_component_1 = require("./components/profile/profile.component");
const image_card_component_1 = require("./components/cards/image-card/image-card.component");
const tabs_over_card_component_1 = require("./components/cards/tabs-over-card/tabs-over-card.component");
const social_card_component_1 = require("./components/cards/social-card/social-card.component");
const ng_gauge_component_1 = require("./components/charts/ng-gauge/ng-gauge.component");
const confirm_component_1 = require("./components/confirm/confirm.component");
const index_1 = require("./components/fab/index");
const ng2_charts_line_component_1 = require("./components/charts/ng2-charts/ng2-charts-line.component");
const ng2_charts_barline_component_1 = require("./components/charts/ng2-charts/ng2-charts-barline.component");
const ng2_charts_bars_component_1 = require("./components/charts/ng2-charts/ng2-charts-bars.component");
const ngx_vertical_bar_chart_component_1 = require("app/shared/components/charts/ngx-charts/ngx-vertical-bar-chart.component");
const ng2_charts_bar_component_1 = require("app/shared/components/charts/ng2-charts/ng2-charts-bar.component");
const basic_details_component_1 = require("app/shared/components/basic-details/basic-details.component");
const ng2_charts_barlineanalytics_component_1 = require("./components/charts/ng2-charts/ng2-charts-barlineanalytics.component");
let SharedModule = SharedModule_1 = class SharedModule {
    static forRoot() {
        return {
            ngModule: SharedModule_1
        };
    }
};
SharedModule = SharedModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            angular2_moment_1.MomentModule,
            material_1.MatAutocompleteModule,
            material_1.MatButtonModule,
            material_1.MatButtonToggleModule,
            material_1.MatCardModule,
            material_1.MatCheckboxModule,
            material_1.MatChipsModule,
            material_1.MatDatepickerModule,
            material_1.MatDialogModule,
            material_1.MatExpansionModule,
            material_1.MatGridListModule,
            material_1.MatIconModule,
            material_1.MatInputModule,
            material_1.MatListModule,
            material_1.MatMenuModule,
            material_1.MatNativeDateModule,
            material_1.MatProgressBarModule,
            material_1.MatProgressSpinnerModule,
            material_1.MatRadioModule,
            material_1.MatRippleModule,
            material_1.MatSelectModule,
            material_1.MatSidenavModule,
            material_1.MatSliderModule,
            material_1.MatSlideToggleModule,
            material_1.MatSnackBarModule,
            material_1.MatTabsModule,
            material_1.MatToolbarModule,
            material_1.MatTooltipModule,
            ng2_charts_1.ChartsModule,
            ngx_charts_1.NgxChartsModule,
            angular2_wizard_1.FormWizardModule,
            ng2_validation_1.CustomFormsModule,
            ng_chartist_1.ChartistModule,
            ngx_datatable_1.NgxDatatableModule,
            ng_bootstrap_1.NgbModule.forRoot(),
            ng2_dnd_1.DndModule.forRoot(),
            flex_layout_1.FlexLayoutModule
        ],
        declarations: [
            app_backdrop_component_1.AppBackdropComponent,
            profile_component_1.Profile,
            footer_component_1.FooterComponent,
            image_card_component_1.ImageCardComponent,
            tabs_over_card_component_1.TabsOverCardComponent,
            social_card_component_1.SocialCardComponent,
            ng_gauge_component_1.salesGaugeComponent,
            ng2_charts_line_component_1.ng2LineChartDemoComponent,
            ng2_charts_barline_component_1.ng2BarLineChartDemoComponent,
            ng2_charts_barlineanalytics_component_1.ng2BarLineChartDemoComponentAnalytics,
            ng2_charts_bars_component_1.ng2BarChartDemoComponent,
            ng2_charts_bar_component_1.ng2BarChartDemoComponentNew,
            ng_gauge_component_1.signupGaugeComponent,
            index_1.SmdFabSpeedDialActionsComponent,
            index_1.SmdFabSpeedDialComponent,
            index_1.SmdFabSpeedDialTriggerComponent,
            confirm_component_1.ConfirmDialogComponent,
            ngx_vertical_bar_chart_component_1.NgxChartsBarVerticalDemoComponent,
            basic_details_component_1.BasicDetailsComponent
        ],
        exports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            angular2_moment_1.MomentModule,
            material_1.MatAutocompleteModule,
            material_1.MatButtonModule,
            material_1.MatButtonToggleModule,
            material_1.MatCardModule,
            material_1.MatCheckboxModule,
            material_1.MatChipsModule,
            material_1.MatDatepickerModule,
            material_1.MatDialogModule,
            material_1.MatExpansionModule,
            material_1.MatGridListModule,
            material_1.MatIconModule,
            material_1.MatInputModule,
            material_1.MatListModule,
            material_1.MatMenuModule,
            material_1.MatNativeDateModule,
            material_1.MatProgressBarModule,
            material_1.MatProgressSpinnerModule,
            material_1.MatRadioModule,
            material_1.MatRippleModule,
            material_1.MatSelectModule,
            material_1.MatSidenavModule,
            material_1.MatSliderModule,
            material_1.MatSlideToggleModule,
            material_1.MatSnackBarModule,
            material_1.MatTabsModule,
            material_1.MatToolbarModule,
            material_1.MatTooltipModule,
            app_backdrop_component_1.AppBackdropComponent,
            profile_component_1.Profile,
            ng_gauge_component_1.salesGaugeComponent,
            ng2_charts_line_component_1.ng2LineChartDemoComponent,
            ng2_charts_barlineanalytics_component_1.ng2BarLineChartDemoComponentAnalytics,
            ng2_charts_barline_component_1.ng2BarLineChartDemoComponent,
            ng2_charts_bars_component_1.ng2BarChartDemoComponent,
            ng2_charts_bar_component_1.ng2BarChartDemoComponentNew,
            ng_gauge_component_1.signupGaugeComponent,
            footer_component_1.FooterComponent,
            image_card_component_1.ImageCardComponent,
            tabs_over_card_component_1.TabsOverCardComponent,
            social_card_component_1.SocialCardComponent,
            forms_1.ReactiveFormsModule,
            angular2_wizard_1.FormWizardModule,
            ng2_charts_1.ChartsModule,
            ngx_charts_1.NgxChartsModule,
            ng2_validation_1.CustomFormsModule,
            ng_chartist_1.ChartistModule,
            ng2_dnd_1.DndModule,
            ngx_datatable_1.NgxDatatableModule,
            ng_bootstrap_1.NgbModule,
            flex_layout_1.FlexLayoutModule,
            index_1.SmdFabSpeedDialActionsComponent,
            index_1.SmdFabSpeedDialComponent,
            index_1.SmdFabSpeedDialTriggerComponent,
            ngx_vertical_bar_chart_component_1.NgxChartsBarVerticalDemoComponent
        ],
        entryComponents: [
            confirm_component_1.ConfirmDialogComponent,
            basic_details_component_1.BasicDetailsComponent
        ]
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map