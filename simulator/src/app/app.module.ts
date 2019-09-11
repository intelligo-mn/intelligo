import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	MatDialogModule,
	MatDatepickerModule,
	MatFormFieldModule,
	MatNativeDateModule,
	MatInputModule,
	MatButtonModule,
	MatListModule,
	MatCheckboxModule,
	MatCardModule,
	MatRadioModule,
	MatProgressBarModule
} from '@angular/material';

import { AgmCoreModule, LAZY_MAPS_API_CONFIG } from '@agm/core';
import { ImageViewerModule } from 'ngx-image-viewer';

import { AppComponent } from './app.component';
import { ChatThreadComponent } from './components/chat-thread/chat-thread.component';

import { StompService } from './services/stomp.service';
import { APIService } from './services/api.service';
import { UtilitiesService } from './services/utilities.service';
import { SimulatorService } from './services/simulator.service';
import { ComplexInputComponent } from './components/complex-input/complex-input.component';
import { GoogleMapsConfig } from './models/google-maps-config.model';
import { MatCSSService } from './services/mat-css.service';
import { ChainDelayService } from './services/chain-delay.service';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
import { InfoDialogService } from './services/info-dialog.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
	declarations: [
		AppComponent,
		ChatThreadComponent,
		ComplexInputComponent,
		InfoDialogComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		BrowserAnimationsModule,
		MatDialogModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatNativeDateModule,
		MatInputModule,
		MatButtonModule,
		MatListModule,
		MatCheckboxModule,
		MatCardModule,
		MatRadioModule,
		MatProgressBarModule,
		RouterModule.forRoot([
			{ path: '', component: ChatThreadComponent },
			{ path: '**', redirectTo: '' }
		]),
		HttpClientModule,
		AgmCoreModule.forRoot(),
		ImageViewerModule.forRoot({
			btnClass: 'hidden',
			zoomFactor: 0.1,
			containerBackgroundColor: 'rgba(0,0,0,0)',
			wheelZoom: true,
			allowFullscreen: true,
			btnIcons: {
				zoomIn: 'hidden',
				zoomOut: 'hidden',
				rotateClockwise: 'hidden',
				rotateCounterClockwise: 'hidden',
				next: 'hidden',
				prev: 'hidden',
				fullscreen: 'hidden',
			}
		}),
	],
	providers: [
		StompService,
		UtilitiesService,
		APIService,
		MatCSSService,
		ChainDelayService,
		SimulatorService,
		InfoDialogService,
		{ provide: LAZY_MAPS_API_CONFIG, useClass: GoogleMapsConfig }
	],
	bootstrap: [AppComponent],
	entryComponents: [
		ComplexInputComponent,
		InfoDialogComponent
	],
	schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
