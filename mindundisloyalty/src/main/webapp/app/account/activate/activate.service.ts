import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from 'app/shared/util/request-util';

type EntityResponseType = HttpResponse<any>;

@Injectable()
export class ActivateService {
    public resourceUrl = SERVER_API_URL + 'api/activate';

    constructor(private http: HttpClient) {}
    
    get(req?: any): Observable<EntityResponseType> {
        const options = createRequestOption(req);
        return this.http
          .get<any>(this.resourceUrl, { params: options, observe: 'response' });
      }
}
