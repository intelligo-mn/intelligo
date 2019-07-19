import { Component, OnInit, OnDestroy } from '@angular/core';
import { LandingFixService } from '../../shared/services/landing-fix.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, OnDestroy {

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
