import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Item } from './item';
import { FlagType, FlagsHelpers } from './flags';

import { RestApiService } from './rest-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RestApiService]
})
export class AppComponent implements OnInit{

  @Input() checkedFlags:Array<FlagType> = [];

  public itemsLeft : Item[] = [];
  public itemsRight : Item[] = [];

  sortOrder: number = -1;
  checkboxFlag:boolean;
  public itemInfo:Item = {name:'', flags:[]};

  

  constructor(private cdRef:ChangeDetectorRef, private restApiService:RestApiService ) {}
  
  public ngOnInit() {
    this.restApiService
      .receiveItems()
      .subscribe(
        (items) => {
          this.itemsLeft = items;
          console.log(typeof(this.itemsLeft[1].flags[1]));
        }
      )
    this.restApiService
    .receiveItems()
    .subscribe(
      (items) => {
        this.itemsRight = items;
      }
    )
  }

  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }

  getItems() {
    console.log('getInfo::',this.itemsRight);
  }

  setInfo( item: Item) {
    console.log("item::",item);
    this.itemInfo = item;
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

  setSortOrder(prop: string) {
    if (this.checkboxFlag == true)
      this.sortOrder = 1;
    else
      this.sortOrder = -1;
    return false;
  }

}