import { Component, ChangeDetectorRef } from '@angular/core';
import { Item } from './item';
import { FlagType } from './enums/flags';
import { RestApiService } from './services/rest-api.service';
import { SortOrder } from './enums/order';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RestApiService]
})
export class AppComponent
{
  sortOrder: SortOrder = SortOrder.reverse;
  cbSortOrder:boolean;

  itemInfo:Item = new Item;
  FlagType = FlagType;

  constructor(private cdRef:ChangeDetectorRef, private utilsService:UtilsService ) {}

  ngAfterViewChecked()
  {
    this.itemInfo = this.utilsService.receiveItemInfo();
    this.cdRef.detectChanges();
  }

  invertSortOrder()
  {
    if (this.cbSortOrder == true)
      this.sortOrder = SortOrder.straight;
    else
      this.sortOrder = SortOrder.reverse;
  }

}