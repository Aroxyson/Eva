import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Item } from './item';

const API_URL = environment.apiUrl;
const TEST_URL = '/assets/db.json';
const limit = 100;

@Injectable({
  providedIn: 'root'
})

export class RestApiService {

  counter:number = 0;
  out: Array<Item> = [];

  constructor( private http: Http ) {}

  public receiveItems(): Observable<Item[]> {
    return this.http
      .get(TEST_URL) //возвращает Observable
      .map(response => {
        const items = response.json();//парсит json ответ
        this.out = [];
        this.counter = 0;
        for(var key in items) {
          if (this.counter < limit) {
            this.out.push(new Item(items[key]));
            this.counter++;
          }
        }
        return this.out;
      })
      .catch(this.handleError);//ловит ошибку
  }

  private handleError (error: Response | any) {
    console.error('RestApiService::handleError', error);
    return Observable.throw(error);
  }
}