import { Component, OnInit, OnDestroy } from '@angular/core';
import { LandingFixService } from '../shared/services/landing-fix.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

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
