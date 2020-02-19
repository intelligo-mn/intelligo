import { Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'topbar-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})

export class SearchComponent implements OnInit {
  searchStatus = false;
  searchValue:string = '';

  closeSearch() {
    this.searchStatus = false;
    this.searchValue = null;
  }

  constructor() { }

  ngOnInit() {
  }
}
