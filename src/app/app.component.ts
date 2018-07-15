import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Item } from './item';
import { FlagType } from './flags';
import { RestApiService } from './rest-api.service';
import { SortOrder } from './orders';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RestApiService]
})
export class AppComponent{

  @Input() checkedFlagsOut:FlagType[] = [];

  sortOrder: SortOrder = SortOrder.reverse;
  cbSortOrder:boolean;

  itemInfo:Item = {name:'', flags:[]};
  checkedFlags: FlagType[] = [];

  FlagType = FlagType;

  constructor(private cdRef:ChangeDetectorRef, private restApiService:RestApiService ) {}
  

  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }

  getCheckedFlags(checkedFlags: FlagType[])
  {
    this.checkedFlags = checkedFlags;
    console.log('checkedFlags', this.checkedFlags);
  }

  setInfo( item: Item) {
    console.log("item::",item);
    this.itemInfo = item;
  }

  onItemDrop(e: any, order: boolean) { //enum DragDirection
    if (order) {
      //Слева направо
      var indexL = this.itemsLeft.indexOf(e.dragData);
      this.itemsRight.push(e.dragData);
      this.itemsLeft.splice(indexL,1);
    }
    else {
     //Справа налево
      var indexR = this.itemsRight.indexOf(e.dragData);
      this.itemsLeft.push(e.dragData);
      this.itemsRight.splice(indexR,1);
    }
  }

  invertSortOrder() {
    if (this.cbSortOrder == true)
      this.sortOrder = SortOrder.straight;
    else
      this.sortOrder = SortOrder.reverse;
      console.log(this.cbSortOrder);
  }

}