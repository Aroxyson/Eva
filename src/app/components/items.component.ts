import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {ItemList} from '../enums/itemList';
import {RestApiService} from '../services/rest-api.service';
import {Item} from '../item';
import {FlagType} from '../enums/flags';
import {SortFilterService} from '../services/sort-filter.service';
import {DndService} from '../services/dnd.service';
import {SortOrder} from '../enums/order';

@Component ({
  selector: 'items',
  templateUrl: './items.component.html'
})

export class ItemsComponent implements OnInit, OnChanges {
  @Input() itemList: ItemList;
  @Input() nameToFilter: string;
  @Input() itemInfo: Item;
  @Input() checkedFlags: FlagType[];
  @Input() sortOrder: SortOrder;
  @Output() itemInfoOut: EventEmitter<Item> = new EventEmitter<Item>();

  items: Item[];
  FlagType = FlagType;
  sortedItems: Item[];

  constructor(
    private restApiService: RestApiService,
    private sortFilterService: SortFilterService,
    private dndService: DndService) {}

  ngOnInit() {
   this.initItems();
  }

  ngOnChanges(changes: SimpleChanges) {
    const nameToFilterCur = changes.nameToFilter ? changes.nameToFilter.currentValue : this.nameToFilter;
    const sortOrderCur = changes.sortOrder ? changes.sortOrder.currentValue : this.sortOrder;
    const checkedFlagsCur = changes.checkedFlags ? changes.checkedFlags.currentValue : this.checkedFlags;
    this.itemInfo = changes.itemInfo ? changes.itemInfo.currentValue : this.itemInfo;

    switch (this.itemList) {
      case ItemList.left:
        if (changes.nameToFilter || changes.sortOrder) {
          this.sortedItems = this.sortFilterService.sortItems(
            this.sortFilterService.filterByName(this.items, nameToFilterCur), sortOrderCur);
        }
        break;
      case ItemList.right:
        if (changes.checkedFlags) {
          this.sortedItems = this.sortFilterService.filterByFlag(this.items, checkedFlagsCur);
        }
        break;
    }
  }

  initItems() {
    this.restApiService.receiveItems().subscribe((items) => {
      this.items = items;
      switch (this.itemList) {
        case ItemList.left:
          this.sortedItems = this.sortFilterService.sortItems(this.items, SortOrder.reverse);
          break;
        case ItemList.right:
          this.sortedItems = this.sortFilterService.filterByFlag(this.items, null);
          break;
      }
    });
  }

  setItemInfo(item: Item) {
    this.itemInfoOut.emit(item);
  }
}
