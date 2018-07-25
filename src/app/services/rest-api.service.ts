import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Item } from '../item';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

const TEST_URL = '/assets/db.json';
const limit = 100;

@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  out: Item[];

  constructor( private http: HttpClient) {}

  public receiveItems(): Observable<Item[]>  {
    return this.http
      .get(TEST_URL)
      .map(response => {
        const items = response;
        this.out = [];
        for (let i = 0; i < limit; i++) {
          this.out.push(new Item(items[i]));
        }
        return this.out;
      })
      .catch(this.handleError);
  }

  private handleError (error: HttpErrorResponse | any) {
    console.error('RestApiService::handleError', error);
    return Observable.throw(error);
  }
}
