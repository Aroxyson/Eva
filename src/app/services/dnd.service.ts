import {Injectable} from '@angular/core';
import {Item} from '../item';
import {ItemList} from '../enums/itemList';

@Injectable ({
  providedIn: 'root'
})

export class DndService {
  dragged = false;

  constructor() {}

  onDragStart(event, item: Item, itemList: ItemList) {
    event.dataTransfer.setData('item',  JSON.stringify(item));
    event.dataTransfer.setData('itemList',  ItemList[itemList]);
  }

  onDrop(event, items: Item[], itemList: ItemList) {
    const dataItemList = event.dataTransfer.getData('itemList');
    if (dataItemList !== ItemList[itemList]) {
      const dataItem = JSON.parse(event.dataTransfer.getData('item'));
      const item: Item = new Item(dataItem);
      this.dragged = true;
      items.push(item);
      event.dataTransfer.clearData('item');
    }
  }

  onDragEnd(items: Item[], item: Item) {
    if (this.dragged) {
      for (let i = 0; i < items.length; i++) {
        if (items[i] === item) {
          items.splice(i, 1);
          break;
        }
      }
    }
    this.dragged = false;
  }

  allowDrop(event) {
    event.preventDefault();
  }
}
