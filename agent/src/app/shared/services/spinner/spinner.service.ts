import {Injectable} from '@angular/core';
declare var $: any;

@Injectable()
export class SpinnerService {

  private _selector:string = 'loader-wrapper';
  private _element:HTMLElement;

  constructor() {
    this._element = document.getElementById(this._selector);
  }

  public show():void {
    this._element.style['display'] = 'block';
		
  }

  public hide(delay:number = 300):void {
    setTimeout(() => {
      this._element.style['display'] = 'none';
    }, delay);
  }
}
