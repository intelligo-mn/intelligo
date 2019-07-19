import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogLeftsideComponent } from './blog-leftside/blog-leftside.component';
import { BlogRightsideComponent } from './blog-rightside/blog-rightside.component';
import { BlogDetailsLeftsideComponent } from './blog-details-leftside/blog-details-leftside.component';
import { BlogDetailsRightsideComponent } from './blog-details-rightside/blog-details-rightside.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: BlogListComponent,
      },
      {
        path: 'details',
        component: BlogDetailsComponent,
      }, 
      {
        path: 'left-sidebar',
        component: BlogLeftsideComponent,
      }, 
      {
        path: 'right-sidebar',
        component: BlogRightsideComponent,
      }, 
      {
        path: 'details-left-sidebar',
        component: BlogDetailsLeftsideComponent,
      },
      {
        path: 'details-right-sidebar',
        component: BlogDetailsRightsideComponent,
      }         
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
