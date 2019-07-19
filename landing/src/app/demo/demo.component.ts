import { Component, OnInit, OnDestroy } from '@angular/core';
import { LandingFixService } from '../shared/services/landing-fix.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit, OnDestroy {

  constructor(private fix: LandingFixService) { }

  today: number = Date.now();

  ngOnInit() {
    this.fix.addFix();
  }

  ngOnDestroy() {
    this.fix.removeFix();
  }

}
