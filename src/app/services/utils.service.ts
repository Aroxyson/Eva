import { Injectable } from '@angular/core';
import { FlagType } from '../enums/flags';
import { Item } from '../item';
import { Subject } from 'rxjs';
import { ItemList } from '../enums/itemList';
import {SortOrder} from '../enums/order';

@Injectable ({
        providedIn: 'root'
})

export class UtilsService {
  itemInfo: Item = new Item;

  constructor() {}

  sendItemInfo(item: Item) {
      this.itemInfo = item;
  }

  receiveItemInfo(): Item {
      return this.itemInfo;
  }

  filterByFlag(items: Item[], checkedFlags: FlagType[]): Item[] {
    function isContainAll(item: Item, checkedFlags: FlagType[]): boolean {
      for (let i = 0; i < checkedFlags.length; i++) {
        if (item.flags.indexOf(checkedFlags[i]) < 0) {
          return false;
        }
      }
      return true;
    }

    function isContainAny(item: Item, checkedFlags: FlagType[]): boolean {
      for (let i = 0; i < checkedFlags.length; i++) {
        if (item.flags.indexOf(checkedFlags[i]) >= 0) {
          return true;
        }
      }
      return false;
    }

    if (!checkedFlags || checkedFlags.length === 0) {
      return items;
    }
    return items.filter
    (item => isContainAll(item, checkedFlags));
  }

  nameFilter(items: Item[], searchText: string): Item[] {
   // let t = Date.now();
    if (!searchText) {
      return items;
    }

    if (!items) {
      return [];
    }

    searchText = searchText.toLowerCase();

    return items.filter( item => {
    //  console.log("Process time ", Date.now()-t);
      return item.name.toLowerCase().includes(searchText);
    });
  }

  sortOrder: SortOrder = SortOrder.reverse;
  sortItems(items: Item[], order: SortOrder): Item[] {
    let comparator;
    const directCompareByName = function(a: Item, b: Item) {
      return a.name > b.name ? 1 : -1;
    };

    switch (order) {
      case SortOrder.straight:
        comparator = directCompareByName;
        break;

      case SortOrder.reverse:
        comparator = function(a: Item, b: Item) {
          return directCompareByName(a, b) * (-1);
        };
        break;
    }
    return items.sort(comparator);
  }

  invertSortOrder(cbSortOrder: boolean) {
    this.sortOrder = cbSortOrder ? SortOrder.straight : SortOrder.reverse;
  }

  getSortOrder(): SortOrder {
    return this.sortOrder;
  }
}
