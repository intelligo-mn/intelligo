import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	$.getScript('./assets/js/timer.js');
  }

}
