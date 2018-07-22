import { Component, Input, OnInit } from "@angular/core";
import { FlagType } from "../enums/flags";
import { Item } from "../item";
import { SortOrder } from "../enums/order";
import { UtilsService } from "../services/utils.service";
import { ItemList } from "../enums/itemList";

@Component
({
    selector: "items-l",
    templateUrl: './items-l.component.html'
})

export class ItemsLComponent implements OnInit
{
    @Input() namesort: string;
    @Input() sortOrder: SortOrder;
    @Input() itemInfo: Item = new Item;

    FlagType = FlagType;
    itemsLeft: Item[] = [];
    itemList: ItemList = ItemList.left;

    constructor(private utilsService: UtilsService)
    {
      this.utilsService.getItems(this.itemList).subscribe(items => { this.itemsLeft = items; });
    }

    ngOnInit()
    {
      this.utilsService.initItems(this.itemList);
    }
}
