import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Item } from '../item';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  TEST_URL = '/assets/db.json';
  URL = '/api/items';
  limit = 100;
  out: Item[];

  constructor( private http: HttpClient) {}

  public receiveItems(): Observable < Item[] >  {
    return this.http
      .get(this.URL)
      .map(response => {
          const items = response;
          this.out = [];
          for (let i = 0; i < this.limit; i++) {
            if (items[i]) {
              this.out.push(new Item(items[i]));
            }
          }
          if (this.out.length === 0) {
            console.log('ERROR::No data in ', this.URL);
            throw new Error('No data');
          }
          return this.out;
      })
      .catch(() => {
        console.log('ERROR::Receiving from ', this.URL, ' is unsuccessful');
        console.log('ERROR::Getting from ', this.TEST_URL, '...');
        return this.http
          .get(this.TEST_URL)
          .map(response => {
            const items = response;
            this.out = [];
            for (let i = 0; i < this.limit; i++) {
              if (items[i]) {
                this.out.push(new Item(items[i]));
              }
            }
            return this.out;
          })
          .catch((err: HttpErrorResponse) => {
            return throwError(err);
          });
      });
  }
}
