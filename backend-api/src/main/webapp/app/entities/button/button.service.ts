import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IButton } from 'app/shared/model/button.model';

type EntityResponseType = HttpResponse<IButton>;
type EntityArrayResponseType = HttpResponse<IButton[]>;

@Injectable({ providedIn: 'root' })
export class ButtonService {
  public resourceUrl = SERVER_API_URL + 'api/buttons';

  constructor(protected http: HttpClient) {}

  create(button: IButton): Observable<EntityResponseType> {
    return this.http.post<IButton>(this.resourceUrl, button, { observe: 'response' });
  }

  update(button: IButton): Observable<EntityResponseType> {
    return this.http.put<IButton>(this.resourceUrl, button, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IButton>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IButton[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
