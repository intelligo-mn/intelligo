import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IChatProject } from 'app/shared/model/chat-project.model';

type EntityResponseType = HttpResponse<IChatProject>;
type EntityArrayResponseType = HttpResponse<IChatProject[]>;

@Injectable({ providedIn: 'root' })
export class ChatProjectService {
  public resourceUrl = SERVER_API_URL + 'api/chat-projects';

  constructor(protected http: HttpClient) {}

  create(chatProject: IChatProject): Observable<EntityResponseType> {
    return this.http.post<IChatProject>(this.resourceUrl, chatProject, { observe: 'response' });
  }

  update(chatProject: IChatProject): Observable<EntityResponseType> {
    return this.http.put<IChatProject>(this.resourceUrl, chatProject, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IChatProject>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IChatProject[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
