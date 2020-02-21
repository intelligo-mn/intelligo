import { Component, OnInit} from '@angular/core';
import {GlobalState} from '../../../app.state';
import { ConfigService } from '../../../shared/services/config/config.service';

@Component({
  selector: '.content_inner_wrapper',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.scss']
})
export class Error404Component implements OnInit {

  constructor(public config: ConfigService, private _state: GlobalState) {

  }

  ngOnInit() {

  }


}
