import { Component, OnInit, Input } from '@angular/core';
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
  public itemsRight : Items[] = [];
  path: string[] = ['name'];
  order: number = -1;
  checkboxFlag:boolean;

  constructor( private itemsService: ItemsService ) {}
  
  public ngOnInit() {
    this.itemsService
      .getAllItems()
      .subscribe(
        (items) => {
          this.items = items;
          console.log(this.itemsRight);
        }
      )
    this.itemsService
    .getAllItems()
    .subscribe(
      (items) => {
        this.itemsRight = items;
        console.log(this.itemsRight);
      }
    )
  }

  sortItems(prop: string) {
    this.path = prop.split('.')
    if (this.checkboxFlag == true)
      this.order = 1;
    else
      this.order = -1;// change order
    return false; // do not reload
  }

}