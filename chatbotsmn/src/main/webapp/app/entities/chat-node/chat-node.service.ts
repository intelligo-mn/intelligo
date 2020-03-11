import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IChatNode } from 'app/shared/model/chat-node.model';

type EntityResponseType = HttpResponse<IChatNode>;
type EntityArrayResponseType = HttpResponse<IChatNode[]>;

@Injectable({ providedIn: 'root' })
export class ChatNodeService {
  public resourceUrl = SERVER_API_URL + 'api/chat-nodes';

  constructor(protected http: HttpClient) {}

  create(chatNode: IChatNode): Observable<EntityResponseType> {
    return this.http.post<IChatNode>(this.resourceUrl, chatNode, { observe: 'response' });
  }

  update(chatNode: IChatNode): Observable<EntityResponseType> {
    return this.http.put<IChatNode>(this.resourceUrl, chatNode, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IChatNode>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IChatNode[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
