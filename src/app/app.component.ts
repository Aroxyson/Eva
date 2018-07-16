import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Item } from './item';
import { FlagType } from './flags';
import { RestApiService } from './rest-api.service';
import { SortOrder } from './order';
import { UtilsService } from './utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RestApiService]
})
export class AppComponent{

  @Input() checkedFlagsOut:FlagType[] = [];

  sortOrder: SortOrder = SortOrder.reverse;
  cbSortOrder:boolean;

  itemInfo:Item = {name:'', flags:[]};
  checkedFlags: FlagType[] = [];

  FlagType = FlagType;

  constructor(private cdRef:ChangeDetectorRef, private utilsService:UtilsService ) {}

  ngAfterViewChecked()
  {
    this.itemInfo = this.utilsService.receiveItemInfo();
    this.cdRef.detectChanges();
  }

  invertSortOrder() {
    if (this.cbSortOrder == true)
      this.sortOrder = SortOrder.straight;
    else
      this.sortOrder = SortOrder.reverse;
      console.log(this.cbSortOrder);
  }

}