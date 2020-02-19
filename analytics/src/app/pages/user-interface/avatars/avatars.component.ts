import { Component, OnInit, Inject} from '@angular/core';
import {GlobalState} from '../../../app.state';
import { ConfigService } from '../../../shared/services/config/config.service';
@Component({
  selector: '.content_inner_wrapper',
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.scss']
})
export class AvatarsComponent {

	constructor(
    @Inject('avatarList') public avatarList
  ){}

}
