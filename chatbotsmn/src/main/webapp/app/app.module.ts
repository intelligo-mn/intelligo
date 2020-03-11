import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { ChatbotsmnSharedModule } from 'app/shared/shared.module';
import { ChatbotsmnCoreModule } from 'app/core/core.module';
import { ChatbotsmnAppRoutingModule } from './app-routing.module';
import { ChatbotsmnHomeModule } from './home/home.module';
import { ChatbotsmnEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    ChatbotsmnSharedModule,
    ChatbotsmnCoreModule,
    ChatbotsmnHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    ChatbotsmnEntityModule,
    ChatbotsmnAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class ChatbotsmnAppModule {}
