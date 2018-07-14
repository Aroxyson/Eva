import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import {ItemsService} from './items.service';
import { Item } from './item';
import { Flags } from './flags';
import { Functions } from './functions.service';

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
  public checkedFlags: Array<Flags> = [];
  public filterFlags: Array<any> = [];
  public itemInfo:Item = {name:'', flags:[]};
  

  constructor( private itemsService: ItemsService, private cdRef:ChangeDetectorRef, private Functions:Functions ) {}
  
  public ngOnInit() {
    this.itemsService
      .getAllItems()
      .subscribe(
        (items) => {
          this.itemsLeft = items;
        }
      )
    this.itemsService
    .getAllItems()
    .subscribe(
      (items) => {
        this.itemsRight = items;
      }
    )
    this.getAllFlags();
  }

  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }

  getItems() {
    console.log('getInfo::',this.itemsRight);
  }

  getAllFlags():void
  {
    var flagsLength:number = Object.keys(Flags).length / 2;
    for (var i=1; i<flagsLength; i++)
    {
      this.filterFlags.push(
          {
            'name' : Flags[i],
            'checked' : false
          }
      )
    }
  }

  setInfo( item: Item) {
    console.log("item::",item);
    this.itemInfo = item;
  }

  addFlag( input: HTMLInputElement, flag: any ) {
    var index = this.checkedFlags.indexOf(Flags.stringToEnum(flag.name));
    if  (input.checked === true) {
      if (index == -1) {
          this.checkedFlags.push(Flags.stringToEnum(flag.name));
          flag.checked = true;
      }
    }
    else {
      if (index != -1) {
        this.checkedFlags.splice(index,1);
        flag.checked = false;
      }
    }
    console.log("filterlags::",this.filterFlags);
    console.log("checkedFlags::",this.checkedFlags);
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