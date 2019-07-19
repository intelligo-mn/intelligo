import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlModule } from 'ngx-owl-carousel';

import { HomeComponent } from './home.component';
import { IntroComponent } from './intro/intro.component';
import { AboutComponent } from './about/about.component';
import { FeatureComponent } from './feature/feature.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ScreenshotComponent } from './screenshot/screenshot.component';
import { HowItWorkComponent } from './how-it-work/how-it-work.component';
import { TeamComponent } from './team/team.component';
import { PriceComponent } from './price/price.component';
import { BlogComponent } from './blog/blog.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqComponent } from './faq/faq.component';
import { DownloadComponent } from './download/download.component';
import { NewsLetterComponent } from './news-letter/news-letter.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    OwlModule
  ],
  declarations: [
    HomeComponent,
    IntroComponent,
    AboutComponent,
    FeatureComponent,
    TestimonialComponent,
    ScreenshotComponent,
    HowItWorkComponent,
    TeamComponent,
    PriceComponent,
    BlogComponent,
    ContactUsComponent,
    FaqComponent,
    DownloadComponent,
    NewsLetterComponent
  ]
})
export class HomeModule { }
