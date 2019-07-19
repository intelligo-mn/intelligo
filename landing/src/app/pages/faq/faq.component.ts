import { Component, OnInit, OnDestroy } from '@angular/core';
import { LandingFixService } from '../../shared/services/landing-fix.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit, OnDestroy {

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
