import { Component, OnInit, AfterViewInit } from '@angular/core';
import noUiSlider from "nouislider";

@Component({
  selector: 'app-crs-section',
  templateUrl: './crs-section.component.html',
  styleUrls: ['./crs-section.component.css']
})
export class CrsSectionComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
      var slider = document.getElementById("input-slider");

      noUiSlider.create(slider, {
        start: 40,
        connect: [true, false],
        range: {
          min: 0,
          max: 100
        }
      });

      var slider2 = document.getElementById("input-slider-range");

      noUiSlider.create(slider2, {
        start: [20, 60],
        connect: true,
        range: {
          min: 0,
          max: 100
        }
      });
    }

}
