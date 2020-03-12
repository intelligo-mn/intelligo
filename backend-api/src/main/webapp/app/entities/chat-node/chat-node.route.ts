import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IChatNode, ChatNode } from 'app/shared/model/chat-node.model';
import { ChatNodeService } from './chat-node.service';
import { ChatNodeComponent } from './chat-node.component';
import { ChatNodeDetailComponent } from './chat-node-detail.component';
import { ChatNodeUpdateComponent } from './chat-node-update.component';

@Injectable({ providedIn: 'root' })
export class ChatNodeResolve implements Resolve<IChatNode> {
  constructor(private service: ChatNodeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChatNode> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((chatNode: HttpResponse<ChatNode>) => {
          if (chatNode.body) {
            return of(chatNode.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ChatNode());
  }
}

export const chatNodeRoute: Routes = [
  {
    path: '',
    component: ChatNodeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ChatNodes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ChatNodeDetailComponent,
    resolve: {
      chatNode: ChatNodeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ChatNodes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ChatNodeUpdateComponent,
    resolve: {
      chatNode: ChatNodeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ChatNodes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ChatNodeUpdateComponent,
    resolve: {
      chatNode: ChatNodeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ChatNodes'
    },
    canActivate: [UserRouteAccessService]
  }
];
