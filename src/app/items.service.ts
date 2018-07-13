import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestApiService } from './rest-api.service';
import { Item } from './item';

@Injectable()
export class ItemsService {

  items: Item[] = [];

  constructor(private api: RestApiService) {
  }

  getAllItems(): Observable<Item[]> {
      return this.api.getAllItems();
  }
}