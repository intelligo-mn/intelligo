import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class LandingFixService {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }
  
 // Add or Remove class

  // Landing page
  public addFix() {
     this.document.body.classList.add('landing-page');
  }

  public removeFix() {
     this.document.body.classList.remove('landing-page');
  }

   public addFixPages() {
     this.document.body.classList.add('inner-page');
  }

  public removeFixPages() {
     this.document.body.classList.remove('inner-page');
  }
 
 
}
