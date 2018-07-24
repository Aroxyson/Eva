import {Component, Input} from '@angular/core';
import { Item } from './item';
import { FlagType } from './enums/flags';
import { SortOrder } from './enums/order';
import { SortFilterService } from './services/sort-filter.service';
import { ItemList } from './enums/itemList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() itemInfoOut: Item;

  itemInfo: Item = new Item();
  checkedFlags: FlagType[] = [];
  FlagType = FlagType;
  ItemList = ItemList;

  constructor(private utilsService: SortFilterService ) {}
}
