// Angular
// https://angular.io/
import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
// Angular Material
// https://material.angular.io/
import {
	MdAutocompleteModule,
	MdButtonModule,
	MdButtonToggleModule,
	MdCardModule,
	MdCheckboxModule,
	MdChipsModule,
	MdDatepickerModule,
	MdDialogModule,
	MdExpansionModule,
	MdGridListModule,
	MdIconModule,
	MdInputModule,
	MdListModule,
	MdMenuModule,
	MdNativeDateModule,
	MdProgressBarModule,
	MdProgressSpinnerModule,
	MdRadioModule,
	MdRippleModule,
	MdSelectModule,
	MdSidenavModule,
	MdSliderModule,
	MdSlideToggleModule,
	MdSnackBarModule,
	MdTabsModule,
	MdToolbarModule,
	MdTooltipModule,
	StyleModule
} from "@angular/material";
import { NguUtilityModule } from "ngu-utility/ngu-utility.module";
import { MalihuScrollbarModule } from "ngx-malihu-scrollbar";

// angular2-moment
// https://github.com/urish/angular2-moment
import { MomentModule } from "angular2-moment";

// ngx-charts
// https://github.com/swimlane/ngx-charts
import { NgxChartsModule } from "@swimlane/ngx-charts";


// ng-gauge
// https://github.com/subarroca/ng-gauge
import { GaugeModule } from "ng-gauge";

//Wizard
import { FormWizardModule } from "angular2-wizard";
//Form Validation
// https://github.com/yuyang041060120/ng2-validation
import { CustomFormsModule } from "ng2-validation";

//ng2-datepicker
//https://github.com/jkuri/ng2-datepicker
import { DatePickerModule } from "ng2-datepicker";

//ng-daterangepicker
//https://github.com/jkuri/ng-daterangepicker
import { NgDateRangePickerModule } from "ng-daterangepicker";


//Drag and drop
import { DndModule } from "ng2-dnd";
//Chartist
import { ChartistModule } from "ng-chartist";
import { ChartsModule } from "ng2-charts";
// UI Shared Components
import { FooterComponent } from "../layout/footer/footer.component";
import { AppBackdropComponent } from "./components/app_backdrop/app_backdrop.component";
import { Profile } from "./components/profile/profile.component";
import { ImageCardComponent } from "./components/cards/image-card/image-card.component";
import { TabsOverCardComponent } from "./components/cards/tabs-over-card/tabs-over-card.component";
import { SocialCardComponent } from "./components/cards/social-card/social-card.component";
import {
	salesGaugeComponent,
	signupGaugeComponent
} from "./components/charts/ng-gauge/ng-gauge.component";
import { ConfirmDialogComponent } from "./components/confirm/confirm.component";
import {
	SmdFabSpeedDialActionsComponent,
	SmdFabSpeedDialComponent,
	SmdFabSpeedDialTriggerComponent
} from "./components/fab/index";

import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
import { ng2LineChartDemoComponent } from "./components/charts/ng2-charts/ng2-charts-line.component";
import { ng2BarChartDemoComponent } from "./components/charts/ng2-charts/ng2-charts-bar.component";
import { EndChatComponent } from "app/shared/components/end-chat/end-chat.component";
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MomentModule,
		MdAutocompleteModule,
		MdButtonModule,
		MdButtonToggleModule,
		MdCardModule,
		MdCheckboxModule,
		MdChipsModule,
		MdDatepickerModule,
		MdDialogModule,
		MdExpansionModule,
		MdGridListModule,
		MdIconModule,
		MdInputModule,
		MdListModule,
		MdMenuModule,
		MdNativeDateModule,
		MdProgressBarModule,
		MdProgressSpinnerModule,
		MdRadioModule,
		MdRippleModule,
		MdSelectModule,
		MdSidenavModule,
		MdSliderModule,
		MdSlideToggleModule,
		MdSnackBarModule,
		MdTabsModule,
		MdToolbarModule,
		MdTooltipModule,
		StyleModule,
		NguUtilityModule,
		ChartsModule,
		NgxChartsModule,
		GaugeModule,
		FormWizardModule,
		CustomFormsModule,
		DatePickerModule,
		ChartistModule,
		NgDateRangePickerModule,
		NgbModule.forRoot(),
		MalihuScrollbarModule.forRoot(),
		DndModule.forRoot(),
		FlexLayoutModule
	],
	declarations: [
		AppBackdropComponent,
		Profile,
		FooterComponent,
		ImageCardComponent,
		TabsOverCardComponent,
		SocialCardComponent,
		salesGaugeComponent,
		ng2LineChartDemoComponent,
		InfoDialogComponent,
		ng2BarChartDemoComponent,
		signupGaugeComponent,
		SmdFabSpeedDialActionsComponent,
		SmdFabSpeedDialComponent,
		SmdFabSpeedDialTriggerComponent,
		ConfirmDialogComponent,
		EndChatComponent
	],
	exports: [
		CommonModule,
		FormsModule,
		MomentModule,
		MdAutocompleteModule,
		MdButtonModule,
		MdButtonToggleModule,
		MdCardModule,
		MdCheckboxModule,
		MdChipsModule,
		MdDatepickerModule,
		MdDialogModule,
		MdExpansionModule,
		MdGridListModule,
		MdIconModule,
		MdInputModule,
		MdListModule,
		MdMenuModule,
		MdNativeDateModule,
		MdProgressBarModule,
		MdProgressSpinnerModule,
		MdRadioModule,
		MdRippleModule,
		MdSelectModule,
		MdSidenavModule,
		MdSliderModule,
		MdSlideToggleModule,
		MdSnackBarModule,
		MdTabsModule,
		MdToolbarModule,
		MdTooltipModule,
		StyleModule,
		NguUtilityModule,
		AppBackdropComponent,
		Profile,
		salesGaugeComponent,
		ng2LineChartDemoComponent,
		InfoDialogComponent,
		ng2BarChartDemoComponent,
		signupGaugeComponent,
		FooterComponent,
		ImageCardComponent,
		TabsOverCardComponent,
		SocialCardComponent,
		ReactiveFormsModule,
		MalihuScrollbarModule,
		FormWizardModule,
		ChartsModule,
		NgxChartsModule,
		GaugeModule,
		CustomFormsModule,
		DatePickerModule,
		ChartistModule,
		DndModule,
		NgDateRangePickerModule,
		NgbModule,
		FlexLayoutModule,
		SmdFabSpeedDialActionsComponent,
		SmdFabSpeedDialComponent,
		SmdFabSpeedDialTriggerComponent
	],
	entryComponents: [
		ConfirmDialogComponent,
		InfoDialogComponent,
		EndChatComponent
	]
})
export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule
		};
	}
}
