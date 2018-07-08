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

  constructor( private itemsService: ItemsService ) {}
  
  public ngOnInit() {
    this.itemsService
      .getAllItems()
      .subscribe(
        (items) => {
          this.itemsLeft = items;
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
    
    this.checkedFlags = [];
    this.filterFlags = [
      {
        name : "flower",
      },
      {
        name : "sun",
      },
      {
        name : "flash",
      },
      {
        name : "heart",
      }
    ]
  }

  addFlag( input: HTMLInputElement, flag: string ) {
    var index = this.checkedFlags.indexOf(flag);
    if  (input.checked === true) {
      if (index == -1) {
          this.checkedFlags.push(flag);
      }
    }
    else {
      if (index != -1) {
        this.checkedFlags.splice(index,1);
      }
    }
    //console.log(this.checkedFlags);
  }

  getCheckedFlags() {
    console.log('getCheckedFlags::'+this.checkedFlags);
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