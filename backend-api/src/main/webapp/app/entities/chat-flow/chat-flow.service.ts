import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IChatFlow } from 'app/shared/model/chat-flow.model';

type EntityResponseType = HttpResponse<IChatFlow>;
type EntityArrayResponseType = HttpResponse<IChatFlow[]>;

@Injectable({ providedIn: 'root' })
export class ChatFlowService {
  public resourceUrl = SERVER_API_URL + 'api/chat-flows';

  constructor(protected http: HttpClient) {}

  create(chatFlow: IChatFlow): Observable<EntityResponseType> {
    return this.http.post<IChatFlow>(this.resourceUrl, chatFlow, { observe: 'response' });
  }

  update(chatFlow: IChatFlow): Observable<EntityResponseType> {
    return this.http.put<IChatFlow>(this.resourceUrl, chatFlow, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IChatFlow>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IChatFlow[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
