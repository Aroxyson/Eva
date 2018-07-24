import {Component, Input, OnInit} from '@angular/core';
import {ItemList} from '../enums/itemList';
import {RestApiService} from '../services/rest-api.service';
import {Item} from '../item';
import {FlagType} from '../enums/flags';
import {SortOrder} from '../enums/order';
import {UtilsService} from '../services/utils.service';

@Component ({
  selector: 'items',
  templateUrl: './items.component.html'
})

export class ItemsComponent implements OnInit {
  @Input() itemList: ItemList;
  @Input() nameToFilter: string;
  @Input() itemInfo: Item;
  @Input() checkedFlags: FlagType[];
  @Input() cbSortOrder: boolean;

  itemsLeft: Item[] = [];
  itemsRight: Item[] = [];
  ItemList = ItemList;
  FlagType = FlagType;
  SortOrder = SortOrder;
  dragged: boolean = false;

  constructor(private restApiService: RestApiService, private utilsService: UtilsService) {}

  public ngOnInit() {
   this.initItems(this.itemList);
  }

  getCheckedFlags(event) {
    console.log(event);
  }

  initItems( itemList: ItemList) {
    switch (itemList) {
      case ItemList.left:
        this.restApiService
          .receiveItems().subscribe((items) => this.itemsLeft = items);
        break;
      case ItemList.right:
        this.restApiService
          .receiveItems().subscribe((items) => this.itemsRight = items);
        break;
    }
  }
  getItems(items: Item[]) {
    console.log('getItems::', items);
  }
  onItemDrop(source: any, target: ItemList) {
    console.log('this.itemsLeft.', this.itemsLeft);
    switch (target) {
      case ItemList.right:
        const indexL = this.itemsLeft.indexOf(source.dragData);
        this.itemsRight.push(source.dragData);
        this.itemsLeft.splice(indexL, 1);
        console.log('this.itemsLeft.', this.itemsLeft);
        console.log('ItemList.', target);
        break;
      case ItemList.left:
        const indexR = this.itemsRight.indexOf(source.dragData);
        this.itemsLeft.push(source.dragData);
        this.itemsRight.splice(indexR, 1);
        break;
    }
  }

  indexOfObj(arrayOfObj: Array<any>, item: any) {
    for (let i = 0; i < arrayOfObj.length; i++) {
      if (arrayOfObj[i].toString() === item.toString()) {
        return i;
      }
    }
    return -1;
  }

  onDragStart(event, item: Item) {
    event.dataTransfer.setData('text/plain',  JSON.stringify(item));
  }

  onDrop(event, target: ItemList) {
    this.dragged = true;
    const dataTransfer = JSON.parse(event.dataTransfer.getData('text/plain'));
    const item: Item = new Item(dataTransfer);
    switch (target) {
      case ItemList.right:
        const indexL = this.indexOfObj(this.itemsLeft, item);
        this.itemsRight.push(item);
        this.itemsLeft.splice(indexL, 1);
        break;
      case ItemList.left:
        const indexR = this.itemsRight.indexOf(item);
        this.itemsLeft.push(item);
        this.itemsRight.splice(indexR, 1);
        break;
    }
    console.log(this.itemsRight, this.itemsLeft);
    event.preventDefault();
  }
  deleteItem(index) {
    console.log('index', index);
    console.log('this.dragged', this.dragged);
    if (this.dragged) {
      this.itemsLeft.splice(index, 1);
      console.log('PIZDA.', index);
    }
  }

  allowDrop(event) {
    event.preventDefault();
  }

}
