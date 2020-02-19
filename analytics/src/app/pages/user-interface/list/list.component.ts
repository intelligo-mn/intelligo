import { Component, OnInit, ElementRef} from '@angular/core';
import {GlobalState} from '../../../app.state';
import { ConfigService } from '../../../shared/services/config/config.service';

@Component({
  selector: '.content_inner_wrapper',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
	
	//Header Title
  title: string = 'List Groups';
	
  constructor() {}
  ngOnInit() {}
  

}
