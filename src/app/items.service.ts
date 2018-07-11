import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestApiService } from './rest-api.service';
import { Items } from './items';

@Injectable()
export class ItemsService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of ids
  counter: number = 0;

  // Placeholder for todos
  items: Items[] = [];

  constructor(private api: RestApiService) {
  }

  getAllItems(): Observable<Items[]> {
      return this.api.getAllItems();
  }
}