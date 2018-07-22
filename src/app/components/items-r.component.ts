import { Component, Input } from "@angular/core";
import { FlagType } from "../enums/flags";
import { Item } from "../item";
import { UtilsService } from "../services/utils.service";
import { ItemList } from "../enums/itemList";

@Component
({
    selector: "items-r",
    templateUrl: './items-r.component.html'
})

export class ItemsRComponent
{

    @Input() itemR: Item;
    @Input() itemInfo: Item = new Item;

    FlagType = FlagType;
    itemsRight: Item[];
    itemList: ItemList = ItemList.right;

    constructor(private utilsService: UtilsService)
    {
      this.utilsService.getItems(this.itemList).subscribe(items => { this.itemsRight = items; });
    }

    public ngOnInit()
    {
      this.utilsService.initItems(this.itemList);
    }

}

