import { Injectable } from '@angular/core';
import { FlagType } from '../enums/flags';
import { Item } from '../item';
import { Subject, Observable } from 'rxjs';
import { RestApiService } from '../services/rest-api.service';
import { ItemList } from '../enums/itemList';
import {SortOrder} from '../enums/order';

@Injectable
    ({
        providedIn: 'root'
    })

export class UtilsService {

  checkedFlags: FlagType[] = [];
  itemInfo: Item = new Item;
  itemsLeft: Item[] = [];
  itemsRight: Item[] = [];

  itemsLeftSubject = new Subject<Item[]>();
  itemsRightSubject = new Subject<Item[]>();

  constructor(private restApiService: RestApiService) {
      this.getItems(ItemList.left).subscribe(items => { this.itemsLeft = items; });
      this.getItems(ItemList.right).subscribe(items => { this.itemsRight = items; });
  }

  initItems( itemList: ItemList) {
      switch (itemList) {
          case ItemList.left:
              this.restApiService
              .receiveItems()
              .subscribe
              ((items) => {this.itemsLeftSubject.next(items); });
              break;
          case ItemList.right:
              this.restApiService
              .receiveItems()
              .subscribe
              ((items) => {this.itemsRightSubject.next(items); });
              break;
      }
  }

  getItems(itemList: ItemList): Observable<any> {
      switch (itemList) {
          case ItemList.left:
              return this.itemsLeftSubject.asObservable();
          case ItemList.right:
              return this.itemsRightSubject.asObservable();
      }
  }

  // sendCheckedFlags(checkedFlags: FlagType[]) {
  //   this.checkedFlags = checkedFlags;
  // }

  receiveCheckedFlags(): FlagType[] {
      return this.checkedFlags;
  }

  sendItemInfo(item: Item) {
      this.itemInfo = item;
  }

  receiveItemInfo(): Item {
      return this.itemInfo;
  }

  sendSubjects() {
      this.itemsLeftSubject.next(this.itemsLeft);
      this.itemsRightSubject.next(this.itemsRight);
  }


  onItemDrop(source: any, target: ItemList) {
      switch (target) {
          case ItemList.right:
              const indexL = this.itemsLeft.indexOf(source.dragData);
              this.itemsRight.push(source.dragData);
              this.itemsLeft.splice(indexL, 1);
              this.sendSubjects();
              break;
          case ItemList.left:
              const indexR = this.itemsRight.indexOf(source.dragData);
              this.itemsLeft.push(source.dragData);
              this.itemsRight.splice(indexR, 1);
              this.sendSubjects();
              break;
      }
  }

  filterByFlag(items: Item[], checkedFlags: FlagType[]): Item[] {
    console.log(checkedFlags);
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
