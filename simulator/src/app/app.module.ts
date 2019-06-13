import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatThreadComponent } from './components/chat-thread/chat-thread.component';
import { ComplexInputComponent } from './components/complex-input/complex-input.component';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatThreadComponent,
    ComplexInputComponent,
    InfoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
