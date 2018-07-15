import { Component, Input } from "@angular/core";
import { FlagType } from "./flags";
import { Item } from "./item";
import { RestApiService } from "./rest-api.service";
import { SortOrder } from "./orders";
import { UtilsService } from "./utils.service";

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

    constructor(private restApiService:RestApiService, private utilsService: UtilsService ) {}

    public ngOnInit()
    {
        this.restApiService
          .receiveItems()
          .subscribe
          (
            (items) => 
            {
              this.itemsLeft = items;
            }
          )
    }
}