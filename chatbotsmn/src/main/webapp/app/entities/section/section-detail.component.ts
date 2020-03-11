import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISection } from 'app/shared/model/section.model';

@Component({
  selector: 'jhi-section-detail',
  templateUrl: './section-detail.component.html'
})
export class SectionDetailComponent implements OnInit {
  section: ISection | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ section }) => {
      this.section = section;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
