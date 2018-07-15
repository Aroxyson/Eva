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
export class AppComponent implements OnInit{

  @Input() checkedFlags:Array<FlagType> = [];

  itemsLeft : Item[] = [];
  itemsRight : Item[] = [];
  
  //sortOrder: number = -1;//переделать в enum
  sortOrder: SortOrder = SortOrder.reverse;
  cbSortOrder:boolean;

  itemInfo:Item = {name:'', flags:[]};

  FlagType = FlagType;

  constructor(private cdRef:ChangeDetectorRef, private restApiService:RestApiService ) {}
  
  public ngOnInit() {
    this.restApiService
      .receiveItems()
      .subscribe(
        (items) => {
          this.itemsLeft = items;
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
  }

}