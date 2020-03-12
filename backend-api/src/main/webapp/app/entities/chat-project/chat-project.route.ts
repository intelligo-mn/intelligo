import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IChatProject, ChatProject } from 'app/shared/model/chat-project.model';
import { ChatProjectService } from './chat-project.service';
import { ChatProjectComponent } from './chat-project.component';
import { ChatProjectDetailComponent } from './chat-project-detail.component';
import { ChatProjectUpdateComponent } from './chat-project-update.component';

@Injectable({ providedIn: 'root' })
export class ChatProjectResolve implements Resolve<IChatProject> {
  constructor(private service: ChatProjectService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChatProject> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((chatProject: HttpResponse<ChatProject>) => {
          if (chatProject.body) {
            return of(chatProject.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ChatProject());
  }
}

export const chatProjectRoute: Routes = [
  {
    path: '',
    component: ChatProjectComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ChatProjects'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ChatProjectDetailComponent,
    resolve: {
      chatProject: ChatProjectResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ChatProjects'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ChatProjectUpdateComponent,
    resolve: {
      chatProject: ChatProjectResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ChatProjects'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ChatProjectUpdateComponent,
    resolve: {
      chatProject: ChatProjectResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ChatProjects'
    },
    canActivate: [UserRouteAccessService]
  }
];
