import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotListComponent } from './bot-list/bot-list.component';
import { BotDetailComponent } from './bot-detail/bot-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BotListComponent, BotDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: "",
        component: BotListComponent
      },
      {
        path: "detail",
        component: BotDetailComponent
      }
    ])
  ]
})
export class MarketModule { }
