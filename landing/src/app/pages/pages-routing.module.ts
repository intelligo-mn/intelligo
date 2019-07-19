import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { ReviewComponent } from './review/review.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FaqComponent } from './faq/faq.component';
import { DownloadComponent } from './download/download.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { RequestFormComponent } from './request-form/request-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      }, 
      {
        path: 'forget-password',
        component: ForgetPasswordComponent,
      }, 
      {
        path: 'thank-you',
        component: ThankYouComponent,
      }, 
      {
        path: 'review',
        component: ReviewComponent,
      },
      {
        path: '404',
        component: ErrorPageComponent,
      },
      {
        path: 'faq',
        component: FaqComponent,
      },
      {
        path: 'download',
        component: DownloadComponent,
      },
      {
        path: 'coming-soon',
        component: ComingSoonComponent,
      },
      {
        path: 'request',
        component: RequestFormComponent,
      }         
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
