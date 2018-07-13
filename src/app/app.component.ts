import { Component, OnInit, Input } from '@angular/core';
import {ItemsService} from './items.service';
import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ItemsService]
})
export class AppComponent implements OnInit{
  public itemsLeft : Item[] = [];
  public itemsRight : Item[] = [];
  path: string[] = ['name'];
  order: number = -1;
  checkboxFlag:boolean;
  public checkedFlags: Array<string>;
  public filterFlags: Array<any>;
  public options: any;
  public itemInfo:Item;

  constructor( private itemsService: ItemsService ) {}
  
  public ngOnInit() {
    this.itemsService
      .getAllItems()
      .subscribe(
        (items) => {
          this.itemsLeft = items;
          console.log('itemsLeft::',this.itemsLeft);
        }
      )
    this.itemsService
    .getAllItems()
    .subscribe(
      (items) => {
        this.itemsRight = items;
        console.log('itemsRight::',this.itemsRight);
      }
    )
    this.itemInfo = new Item;
    this.checkedFlags = [];

    this.filterFlags = [
      {
        name : "flower",
        checked: false
      },
      {
        name : "sun",
        checked: false
      },
      {
        name : "flash",
        checked: false
      },
      {
        name : "heart",
        checked: false
      }
    ];

    this.options = {
      removeOnSpill: false,
      revertOnSpill: true,
      copy: false
    };
  }

  setInfo( item: Item) {
    console.log("item::",item);
    this.itemInfo = item;
  }

  addFlag( input: HTMLInputElement, flag: any ) {
    var index = this.checkedFlags.indexOf(flag.name);
    if  (input.checked === true) {
      if (index == -1) {
          this.checkedFlags.push(flag.name);
          flag.checked = true;
      }
    }
    else {
      if (index != -1) {
        this.checkedFlags.splice(index,1);
        flag.checked = false;
      }
    }
  }

  onItemDrop(e: any, order: boolean) {
    var indexL = this.itemsLeft.indexOf(e.dragData);
    var indexR = this.itemsRight.indexOf(e.dragData);
    if (order) {
      //Слева направо
      this.itemsRight.push(e.dragData);
      this.itemsLeft.splice(indexL,1);
    }
    else {
     //Справа налево
      this.itemsLeft.push(e.dragData);
      this.itemsRight.splice(indexR,1);
    }
  }

  sortItems(prop: string) {
    this.path = prop.split('.')
    if (this.checkboxFlag == true)
      this.order = 1;
    else
      this.order = -1;
    return false;
  }

}