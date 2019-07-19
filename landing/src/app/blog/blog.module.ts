import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';

import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogLeftsideComponent } from './blog-leftside/blog-leftside.component';
import { BlogRightsideComponent } from './blog-rightside/blog-rightside.component';
import { BlogDetailsLeftsideComponent } from './blog-details-leftside/blog-details-leftside.component';
import { BlogDetailsRightsideComponent } from './blog-details-rightside/blog-details-rightside.component';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule
  ],
  declarations: [
    BlogListComponent,
    BlogDetailsComponent,
    BlogLeftsideComponent,
    BlogRightsideComponent,
    BlogDetailsLeftsideComponent,
    BlogDetailsRightsideComponent
  ]
})
export class BlogModule { }
