import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotListComponent } from './bot-list/bot-list.component';
import { BotDetailComponent } from './bot-detail/bot-detail.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    component: BotListComponent
  },
  {
    path: 'detail',
    component: BotDetailComponent
  }
];
@NgModule({
  declarations: [BotListComponent, BotDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MarketModule { }
