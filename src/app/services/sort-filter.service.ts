import { Injectable } from '@angular/core';
import { FlagType } from '../enums/flags';
import { Item } from '../item';
import {SortOrder} from '../enums/order';

@Injectable ({
        providedIn: 'root'
})

export class SortFilterService {
  sortOrder: SortOrder = SortOrder.reverse;

  constructor() {}

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

  filterByName(items: Item[], searchText: string): Item[] {
    if (!searchText) {
      return items;
    }

    if (!items) {
      return [];
    }

    searchText = searchText.toLowerCase();

    return items.filter( item => {
      return item.name.toLowerCase().includes(searchText);
    });
  }

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
    return this.sortOrder = cbSortOrder ? SortOrder.straight : SortOrder.reverse;
  }

  getSortOrder(): SortOrder {
    console.log(this.sortOrder);
    return this.sortOrder;
  }
}
