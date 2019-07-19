import { Routes, RouterModule } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { BlogComponent } from './blog/blog.component';

export const rootRouterConfig: Routes = [
  { 
    path: '', 
    redirectTo: 'demo', 
    pathMatch: 'full' 
  },
  { 
    path: 'demo',
    component: DemoComponent
  },
  { 
    path: 'home', 
    loadChildren: './home/home.module#HomeModule'
  },
  { 
    path: 'blog',
    component: BlogComponent,
    loadChildren: './blog/blog.module#BlogModule'   
  },
  { 
    path: 'pages',
    loadChildren: './pages/pages.module#PagesModule'  
  },
  { 
    path: '**', 
    redirectTo: 'home/one'
  }
];

