import { Component, Input, ChangeDetectorRef } from "@angular/core";
import { FlagType } from "./flags";
import { Item } from "./item";
import { SortOrder } from "./order";
import { UtilsService } from "./utils.service";
import { ItemList } from "./itemList";

@Component ({
    selector: "items-l",
    templateUrl: './items-l.component.html'
})

export class ItemsLComponent {

    @Input() namesort:string;
    @Input() sortOrder:SortOrder;
    @Input() itemInfo:Item = new Item;

    FlagType = FlagType;
    itemsLeft: Item[] = [];
    itemList: ItemList = ItemList.left;

    constructor(private cdRef:ChangeDetectorRef, private utilsService: UtilsService )
    {
      //this.utilsService.getItems(this.itemList).subscribe(items => { this.itemsLeft = items; });
    }

    public ngOnInit()
    {
      this.utilsService.initItems(this.itemList);
      //this.itemsLeft = this.utilsService.getItemsLeft();
    }

    ngAfterViewChecked()
    {
      this.itemsLeft = this.utilsService.getItemsLeft();
      this.cdRef.detectChanges();
    }
}