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
  public itemsLeft : Items[] = [];
  public itemsRight : Items[] = [];
  path: string[] = ['name'];
  order: number = -1;
  checkboxFlag:boolean;
  public checkedFlags: Array<string>;
  public filterFlags: Array<any>;
  public options: any;
  public itemInfo:Items;

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
    this.itemInfo = new Items;
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
      removeOnSpill: true,
      revertOnSpill: true,
      copy: false
    };
  }

  setInfo( item: Items) {
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

  getCheckedFlags() {
    return this.checkedFlags;
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