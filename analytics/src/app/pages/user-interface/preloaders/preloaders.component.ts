import { Component} from '@angular/core';
import {GlobalState} from '../../../app.state';
import { ConfigService } from '../../../shared/services/config/config.service';

@Component({
  selector: '.content_inner_wrapper',
  templateUrl: './preloaders.component.html',
  styleUrls: ['./preloaders.component.scss']
})
export class PreloadersComponent {
	//Header Title
	title: string = 'Preloaders';
	
	
  progressValue: number = 60;
  color: string = 'primary';
  modeToggle: boolean = false;

  step(val: number) {
    this.progressValue = Math.max(0, Math.min(100, val + this.progressValue));
  }

}
