import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from './shared.module';
import { ManageUsersModule, MANAGE_USERS_ROUTES } from './components/manage-users/manage-users.module';
import { StudioModule, STUDIO_ROUTES } from './components/studio/studio.module';
import { AnalyticsModule, ANALYTICS_ROUTES } from './components/analytics/analytics.module';
import { HotkeyModule } from 'angular2-hotkeys';
import { DeployModule, DEPLOY_ROUTES } from './components/deploy/deploy.module';
import { FormsModule } from '@angular/forms';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'studio', pathMatch: "full" },
  {
    path: 'manage-users',
    children: MANAGE_USERS_ROUTES
  },
  {
    path: 'studio',
    children: STUDIO_ROUTES
  },
  {
    path: 'deploy',
    children: DEPLOY_ROUTES
  },
  {
    path: 'analytics',
    children: ANALYTICS_ROUTES
  },
  // { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'studio' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    ManageUsersModule,
    StudioModule,
    AnalyticsModule,
    DeployModule,
    RouterModule.forRoot(APP_ROUTES, {
      useHash: true
    }),
    HotkeyModule.forRoot({
      cheatSheetCloseEsc: true,
    })
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
