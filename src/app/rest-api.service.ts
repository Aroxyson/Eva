import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Items } from './items';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class RestApiService {

  constructor( private http: Http ) {}

  public getAllItems(): Observable<Items[]> {
    return this.http
      .get(API_URL + '/items') //возвращает Observable
      .map(response => {
        const items = response.json();//парсит json ответ
        return items.map((item_response) => new Items(item_response)); //возвращает преобразованный Observable в Items объект
      })
      .catch(this.handleError);//ловит ошибку
  }

  private handleError (error: Response | any) {
    console.error('RestApiService::handleError', error);
    return Observable.throw(error);
  }
}
