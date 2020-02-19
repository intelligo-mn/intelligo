import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarsComponent } from './avatars.component';
import { SharedModule } from '../../../shared/shared.module';
import {AvatarsService} from './avatars.service'

const AVATARS_ROUTE = [
  { path: '', component: AvatarsComponent },
];

@NgModule({
  declarations: [AvatarsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(AVATARS_ROUTE)
  ],
		providers: [
    { provide: 'avatarList', useClass: AvatarsService }
  ]

})
export class AvatarsModule { }
