import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISection, Section } from 'app/shared/model/section.model';
import { SectionService } from './section.service';
import { SectionComponent } from './section.component';
import { SectionDetailComponent } from './section-detail.component';
import { SectionUpdateComponent } from './section-update.component';

@Injectable({ providedIn: 'root' })
export class SectionResolve implements Resolve<ISection> {
  constructor(private service: SectionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISection> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((section: HttpResponse<Section>) => {
          if (section.body) {
            return of(section.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Section());
  }
}

export const sectionRoute: Routes = [
  {
    path: '',
    component: SectionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sections'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SectionDetailComponent,
    resolve: {
      section: SectionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sections'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SectionUpdateComponent,
    resolve: {
      section: SectionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sections'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SectionUpdateComponent,
    resolve: {
      section: SectionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sections'
    },
    canActivate: [UserRouteAccessService]
  }
];
