import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IButton, Button } from 'app/shared/model/button.model';
import { ButtonService } from './button.service';
import { ButtonComponent } from './button.component';
import { ButtonDetailComponent } from './button-detail.component';
import { ButtonUpdateComponent } from './button-update.component';

@Injectable({ providedIn: 'root' })
export class ButtonResolve implements Resolve<IButton> {
  constructor(private service: ButtonService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IButton> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((button: HttpResponse<Button>) => {
          if (button.body) {
            return of(button.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Button());
  }
}

export const buttonRoute: Routes = [
  {
    path: '',
    component: ButtonComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Buttons'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ButtonDetailComponent,
    resolve: {
      button: ButtonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Buttons'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ButtonUpdateComponent,
    resolve: {
      button: ButtonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Buttons'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ButtonUpdateComponent,
    resolve: {
      button: ButtonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Buttons'
    },
    canActivate: [UserRouteAccessService]
  }
];
