import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemList} from '../enums/itemList';
import {RestApiService} from '../services/rest-api.service';
import {Item} from '../item';
import {FlagType} from '../enums/flags';
import {SortFilterService} from '../services/sort-filter.service';
import {DndService} from '../services/dnd.service';

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
  @Output() itemInfoOut: EventEmitter<Item> = new EventEmitter<Item>();

  items: Item[] = [];
  ItemList = ItemList;
  FlagType = FlagType;

  constructor(
    private restApiService: RestApiService,
    private sortFilterService: SortFilterService,
    private dndService: DndService) {}

  public ngOnInit() {
   this.initItems();
  }

  initItems() {
    this.restApiService.receiveItems().subscribe((items) => this.items = items);
  }

  trackByFn(item, index) {
    return item.name;
  }
  setItemInfo(item: Item) {
    this.itemInfoOut.emit(item);
  }

  getItems(items: Item[]) {
    console.log('getItems::', items);
  }
}
