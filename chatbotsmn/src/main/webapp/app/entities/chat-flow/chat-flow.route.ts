import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IChatFlow, ChatFlow } from 'app/shared/model/chat-flow.model';
import { ChatFlowService } from './chat-flow.service';
import { ChatFlowComponent } from './chat-flow.component';
import { ChatFlowDetailComponent } from './chat-flow-detail.component';
import { ChatFlowUpdateComponent } from './chat-flow-update.component';

@Injectable({ providedIn: 'root' })
export class ChatFlowResolve implements Resolve<IChatFlow> {
  constructor(private service: ChatFlowService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChatFlow> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((chatFlow: HttpResponse<ChatFlow>) => {
          if (chatFlow.body) {
            return of(chatFlow.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ChatFlow());
  }
}

export const chatFlowRoute: Routes = [
  {
    path: '',
    component: ChatFlowComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ChatFlows'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ChatFlowDetailComponent,
    resolve: {
      chatFlow: ChatFlowResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ChatFlows'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ChatFlowUpdateComponent,
    resolve: {
      chatFlow: ChatFlowResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ChatFlows'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ChatFlowUpdateComponent,
    resolve: {
      chatFlow: ChatFlowResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ChatFlows'
    },
    canActivate: [UserRouteAccessService]
  }
];
