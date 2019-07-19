import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {

// DomSanitizer for safe html content.
    constructor(private _sanitizer:DomSanitizer) { }

    // Team Carousel
    public team = [{
        image: 'assets/images/1.jpg',
        social: this._sanitizer.bypassSecurityTrustHtml('<li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li><li><a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li><li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li><li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li><li><a href="#"><i class="fa fa-rss" aria-hidden="true"></i></a></li>'),
      }, {
        image: 'assets/images/2.jpg',
        social: this._sanitizer.bypassSecurityTrustHtml('<li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li><li><a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li><li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li><li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li><li><a href="#"><i class="fa fa-rss" aria-hidden="true"></i></a></li>'),
      }, {
        image: 'assets/images/1.jpg',
        social: this._sanitizer.bypassSecurityTrustHtml('<li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li><li><a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li><li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li><li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li><li><a href="#"><i class="fa fa-rss" aria-hidden="true"></i></a></li>'),
      }]


    // Team Carousel Options
	public teamCarousel: any ={
	    loop:false,
        margin:15,
        nav:false,
        autoplay:false,
        autoplayTimeout:2000,
        autoplayHoverPause:true,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            576:{
                items:2,
                margin:12
            },
            600:{
                items:2
            },
            767:{
                items:2
            },
            768:{
                items:2,
                margin:15
            },
            992:{
                items:3
            },
            1000:{
                items:3
            }
        }
	}



}
