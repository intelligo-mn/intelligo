import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from './components/shared/shared.module';
import {
  ManageUsersModule,
  MANAGE_USERS_ROUTES,
} from './components/manage-users/manage-users.module';
import { StudioModule, STUDIO_ROUTES } from './components/studio/studio.module';
import {
  AnalyticsModule,
  ANALYTICS_ROUTES,
} from './components/analytics/analytics.module';
import { HotkeyModule } from 'angular2-hotkeys';
import { DeployModule, DEPLOY_ROUTES } from './components/deploy/deploy.module';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthGuard } from './core/auth.guard';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

const APP_ROUTES: Routes = [
  { path: '', children: STUDIO_ROUTES, canActivate: [AuthGuard] },
  {
    path: 'manage-users',
    children: MANAGE_USERS_ROUTES,
  },
  {
    path: 'studio',
    children: STUDIO_ROUTES,
    canActivate: [AuthGuard],
  },
  {
    path: 'deploy',
    children: DEPLOY_ROUTES,
  },
  {
    path: 'analytics',
    children: ANALYTICS_ROUTES,
  },
  // { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    FormsModule,
    SharedModule,
    ManageUsersModule,
    StudioModule,
    AnalyticsModule,
    DeployModule,
    RouterModule.forRoot(APP_ROUTES, {
      useHash: true,
    }),
    HotkeyModule.forRoot({
      cheatSheetCloseEsc: true,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
