import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  
  constructor() { }

  ngOnInit() { }

  // Blog Carousel
  public blog = [{
        image: 'assets/images/blog/1.jpg',
        date: '15 jun 2016',
        title: 'Lorem ipsum is more-or-less',
        details: 'long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ontent of a page when looking at its layout.',
      }, {
        image: 'assets/images/blog/2.jpg',
        date: '10 February 2012',
        title: 'Lorem ipsum is more-or-less',
        details: 'long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ontent of a page when looking at its layout.',
      }, {
        image: 'assets/images/blog/3.jpg',
        date: '12 march 2015',
        title: 'Lorem ipsum is more-or-less',
        details: 'long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ontent of a page when looking at its layout.',
      },{
        image: 'assets/images/blog/3.jpg',
        date: '12 march 2015',
        title: 'Lorem ipsum is more-or-less',
        details: 'long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ontent of a page when looking at its layout.',
      },{
        image: 'assets/images/blog/3.jpg',
        date: '12 march 2015',
        title: 'Lorem ipsum is more-or-less',
        details: 'long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ontent of a page when looking at its layout.',
      },{
        image: 'assets/images/blog/3.jpg',
        date: '12 march 2015',
        title: 'Lorem ipsum is more-or-less',
        details: 'long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ontent of a page when looking at its layout.',
      },{
        image: 'assets/images/blog/3.jpg',
        date: '12 march 2015',
        title: 'Lorem ipsum is more-or-less',
        details: 'long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ontent of a page when looking at its layout.',
      },{
        image: 'assets/images/blog/3.jpg',
        date: '12 march 2015',
        title: 'Lorem ipsum is more-or-less',
        details: 'long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ontent of a page when looking at its layout.',
      },{
        image: 'assets/images/blog/3.jpg',
        date: '12 march 2015',
        title: 'Lorem ipsum is more-or-less',
        details: 'long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ontent of a page when looking at its layout.',
      },{
        image: 'assets/images/blog/3.jpg',
        date: '12 march 2015',
        title: 'Lorem ipsum is more-or-less',
        details: 'long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ontent of a page when looking at its layout.',
      }, {
        image: 'assets/images/blog/1.jpg',
        date: '28 December 2017',
        title: 'Lorem ipsum is more-or-less',
        details: 'long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ontent of a page when looking at its layout.',
    }, {
      image: 'assets/images/blog/1.jpg',
      date: '28 December 2017',
      title: 'Lorem ipsum is more-or-less',
      details: 'long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ontent of a page when looking at its layout.',
  }]

    // Blog Carousel Options
	public blogCarousel: any ={
	      loop:true,
        margin:30,
        nav:false,
        items:12,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            },
            1024:{
                items:2
            },
            1200:{
                items:3
            }
        }
	}

}
