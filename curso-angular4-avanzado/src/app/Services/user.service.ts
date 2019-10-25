import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/observable';
import { GLOBAL } from './global';

@Injectable()
export class UserService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  register(user_to_register) {
    const params = JSON.stringify(user_to_register);
    const headers = new Headers({'Content-Type' : 'application/json'});

    return this._http.post(this.url + 'register', params, { headers}).map(res => res.json());
  }

  signup(user_to_login, gettoken = null) {
    if (gettoken != null) {
      user_to_login.gettoken = gettoken;
    }
    const params = JSON.stringify(user_to_login);
    const headers = new Headers({'Content-Type' : 'application/json'});

    return this._http.post(this.url + 'login', params, { headers}).
              map(res => res.json());
  }

  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('identity'));

    if (identity !== 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (token !== 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  updateUser(user_to_update) {
    const params = JSON.stringify(user_to_update);
    const headers = new Headers({'Content-Type' : 'application/json',
                                 'Authorization': this.getToken()});

    return this._http.put(this.url + 'updateUser/' + user_to_update._id, params, { headers: headers}).map(res => res.json());
  }

  getKeepers() {
    return this._http.get(this.url + 'Keepers').map(res => res.json());
  }
}
