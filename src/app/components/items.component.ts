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

  itemsLeft: Item[] = [];
  itemsRight: Item[] = [];
  ItemList = ItemList;
  FlagType = FlagType;
  SortOrder = SortOrder;

  constructor(private restApiService: RestApiService, private utilsService: UtilsService) {}

  public ngOnInit() {
   this.initItems(this.itemList);
  }

  getItems(items: Item[]) {
    console.log('getItems::', items);
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
}
