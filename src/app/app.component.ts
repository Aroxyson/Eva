import { Component, ChangeDetectorRef } from '@angular/core';
import { Item } from './item';
import { FlagType } from './enums/flags';
import { SortOrder } from './enums/order';
import { UtilsService } from './services/utils.service';
import { ItemList } from './enums/itemList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sortOrder: SortOrder = SortOrder.reverse;

  itemInfo: Item = new Item;
  FlagType = FlagType;
  ItemList = ItemList;
  checkedFlags: FlagType[];

  constructor(private cdRef: ChangeDetectorRef, private utilsService: UtilsService ) {}

  ngAfterViewChecked() {
    this.itemInfo = this.utilsService.receiveItemInfo();
    this.cdRef.detectChanges();
  }



}
