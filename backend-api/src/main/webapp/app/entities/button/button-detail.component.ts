import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IButton } from 'app/shared/model/button.model';

@Component({
  selector: 'jhi-button-detail',
  templateUrl: './button-detail.component.html'
})
export class ButtonDetailComponent implements OnInit {
  button: IButton | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ button }) => {
      this.button = button;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
