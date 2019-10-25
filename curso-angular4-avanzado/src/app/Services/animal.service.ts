import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/observable';
import { GLOBAL } from './global';

@Injectable()
export class AnimalService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  addAnimal(token, animal_to_add) {
    const params = JSON.stringify(animal_to_add);
    const headers = new Headers({'Content-Type' : 'application/json',
                                 'Authorization': token});

    return this._http.post(this.url + 'saveanimal/', params, { headers: headers}).map(res => res.json());
  }

  getAnimals() {
    return this._http.get(this.url + 'getanimals').map(res => res.json());
  }

  getAnimal(id) {
    return this._http.get(this.url + 'getanimal/' + id).map(res => res.json());
  }

  editAnimnal(token, id, animal) {
    const params = JSON.stringify(animal);
    const headers = new Headers({'Content-Type' : 'application/json',
                                 'Authorization': token});

    return this._http.put(this.url + 'updateAnimal/' + id, params, {headers}).map( res => res.json());
  }

  deleteAnimal(token, id) {
    const headers = new Headers({'Content-Type' : 'application/json',
                                 'Authorization': token});
    const options = new RequestOptions({headers: headers});

    return this._http.delete(this.url + 'deleteAnimal/' + id, options).map( res => res.json());
  }

}
