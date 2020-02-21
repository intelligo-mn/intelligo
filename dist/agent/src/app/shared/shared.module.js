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
const ngu_utility_module_1 = require("ngu-utility/ngu-utility.module");
const ngx_malihu_scrollbar_1 = require("ngx-malihu-scrollbar");
const angular2_moment_1 = require("angular2-moment");
const ngx_charts_1 = require("@swimlane/ngx-charts");
const ng_gauge_1 = require("ng-gauge");
const angular2_wizard_1 = require("angular2-wizard");
const ng2_validation_1 = require("ng2-validation");
const ng2_datepicker_1 = require("ng2-datepicker");
const ng_daterangepicker_1 = require("ng-daterangepicker");
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
const info_dialog_component_1 = require("./components/info-dialog/info-dialog.component");
const ng2_charts_line_component_1 = require("./components/charts/ng2-charts/ng2-charts-line.component");
const ng2_charts_bar_component_1 = require("./components/charts/ng2-charts/ng2-charts-bar.component");
const end_chat_component_1 = require("app/shared/components/end-chat/end-chat.component");
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
            material_1.MdAutocompleteModule,
            material_1.MdButtonModule,
            material_1.MdButtonToggleModule,
            material_1.MdCardModule,
            material_1.MdCheckboxModule,
            material_1.MdChipsModule,
            material_1.MdDatepickerModule,
            material_1.MdDialogModule,
            material_1.MdExpansionModule,
            material_1.MdGridListModule,
            material_1.MdIconModule,
            material_1.MdInputModule,
            material_1.MdListModule,
            material_1.MdMenuModule,
            material_1.MdNativeDateModule,
            material_1.MdProgressBarModule,
            material_1.MdProgressSpinnerModule,
            material_1.MdRadioModule,
            material_1.MdRippleModule,
            material_1.MdSelectModule,
            material_1.MdSidenavModule,
            material_1.MdSliderModule,
            material_1.MdSlideToggleModule,
            material_1.MdSnackBarModule,
            material_1.MdTabsModule,
            material_1.MdToolbarModule,
            material_1.MdTooltipModule,
            material_1.StyleModule,
            ngu_utility_module_1.NguUtilityModule,
            ng2_charts_1.ChartsModule,
            ngx_charts_1.NgxChartsModule,
            ng_gauge_1.GaugeModule,
            angular2_wizard_1.FormWizardModule,
            ng2_validation_1.CustomFormsModule,
            ng2_datepicker_1.DatePickerModule,
            ng_chartist_1.ChartistModule,
            ng_daterangepicker_1.NgDateRangePickerModule,
            ng_bootstrap_1.NgbModule.forRoot(),
            ngx_malihu_scrollbar_1.MalihuScrollbarModule.forRoot(),
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
            info_dialog_component_1.InfoDialogComponent,
            ng2_charts_bar_component_1.ng2BarChartDemoComponent,
            ng_gauge_component_1.signupGaugeComponent,
            index_1.SmdFabSpeedDialActionsComponent,
            index_1.SmdFabSpeedDialComponent,
            index_1.SmdFabSpeedDialTriggerComponent,
            confirm_component_1.ConfirmDialogComponent,
            end_chat_component_1.EndChatComponent
        ],
        exports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            angular2_moment_1.MomentModule,
            material_1.MdAutocompleteModule,
            material_1.MdButtonModule,
            material_1.MdButtonToggleModule,
            material_1.MdCardModule,
            material_1.MdCheckboxModule,
            material_1.MdChipsModule,
            material_1.MdDatepickerModule,
            material_1.MdDialogModule,
            material_1.MdExpansionModule,
            material_1.MdGridListModule,
            material_1.MdIconModule,
            material_1.MdInputModule,
            material_1.MdListModule,
            material_1.MdMenuModule,
            material_1.MdNativeDateModule,
            material_1.MdProgressBarModule,
            material_1.MdProgressSpinnerModule,
            material_1.MdRadioModule,
            material_1.MdRippleModule,
            material_1.MdSelectModule,
            material_1.MdSidenavModule,
            material_1.MdSliderModule,
            material_1.MdSlideToggleModule,
            material_1.MdSnackBarModule,
            material_1.MdTabsModule,
            material_1.MdToolbarModule,
            material_1.MdTooltipModule,
            material_1.StyleModule,
            ngu_utility_module_1.NguUtilityModule,
            app_backdrop_component_1.AppBackdropComponent,
            profile_component_1.Profile,
            ng_gauge_component_1.salesGaugeComponent,
            ng2_charts_line_component_1.ng2LineChartDemoComponent,
            info_dialog_component_1.InfoDialogComponent,
            ng2_charts_bar_component_1.ng2BarChartDemoComponent,
            ng_gauge_component_1.signupGaugeComponent,
            footer_component_1.FooterComponent,
            image_card_component_1.ImageCardComponent,
            tabs_over_card_component_1.TabsOverCardComponent,
            social_card_component_1.SocialCardComponent,
            forms_1.ReactiveFormsModule,
            ngx_malihu_scrollbar_1.MalihuScrollbarModule,
            angular2_wizard_1.FormWizardModule,
            ng2_charts_1.ChartsModule,
            ngx_charts_1.NgxChartsModule,
            ng_gauge_1.GaugeModule,
            ng2_validation_1.CustomFormsModule,
            ng2_datepicker_1.DatePickerModule,
            ng_chartist_1.ChartistModule,
            ng2_dnd_1.DndModule,
            ng_daterangepicker_1.NgDateRangePickerModule,
            ng_bootstrap_1.NgbModule,
            flex_layout_1.FlexLayoutModule,
            index_1.SmdFabSpeedDialActionsComponent,
            index_1.SmdFabSpeedDialComponent,
            index_1.SmdFabSpeedDialTriggerComponent
        ],
        entryComponents: [
            confirm_component_1.ConfirmDialogComponent,
            info_dialog_component_1.InfoDialogComponent,
            end_chat_component_1.EndChatComponent
        ]
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map