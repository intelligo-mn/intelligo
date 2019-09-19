import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // { path: 'user-profile', component: ProfileComponent },
  // { path: 'register', component: SignupComponent },
  // { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LandingComponent },
  {
    path: 'market',
    loadChildren: () => import('./market/market.module').then(m => m.MarketModule)
  },
   { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
