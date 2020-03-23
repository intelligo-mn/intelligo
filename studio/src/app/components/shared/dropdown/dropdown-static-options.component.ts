import { Component } from '@angular/core';

@Component({
  selector: 'dev-dropdown-static-options',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./dropdown-static-options.component.scss']
})
export class DropdownStaticOptionsComponent {}

@Component({
  selector: 'dev-dropdown-static-option',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./dropdown-static-option.component.scss']
})
export class DropdownStaticOptionComponent {}
