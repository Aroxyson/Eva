import { Component, OnInit } from '@angular/core';
import { RestApiService } from './rest-api.service';
import {ItemsService} from './items.service';
import { Items } from './items';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ItemsService]
})
export class AppComponent implements OnInit{
  public items : Items[] = [];

  constructor( private itemsService: ItemsService ) {}

  public ngOnInit() {
    this.itemsService
      .getAllItems()
      .subscribe(
        (items) => {
          this.items = items;
          console.log(this.items);
        }
      );
  }
}