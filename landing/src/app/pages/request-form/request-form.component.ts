import { Component, OnInit, OnDestroy } from '@angular/core';
import { LandingFixService } from '../../shared/services/landing-fix.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit, OnDestroy {

  constructor(
      private fix: LandingFixService
  ) { }

  ngOnInit() {
    this.fix.addFixPages();
  }

  ngOnDestroy() {
    this.fix.removeFixPages();
  }

}
