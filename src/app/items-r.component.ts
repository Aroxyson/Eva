import { Component, Input } from "@angular/core";
import { FlagType } from "./flags";
import { Item } from "./item";
import { RestApiService } from "./rest-api.service";
import { UtilsService } from "./utils.service";

@Component ({
    selector: "items-r",
    templateUrl: './items-r.component.html'
})

export class ItemsRComponent {

    @Input() itemR: Item;
    FlagType = FlagType;
    itemsRight: Item[];

    constructor(private restApiService:RestApiService, private utilsService:UtilsService) {}

    public ngOnInit()
    {
        this.restApiService
          .receiveItems()
          .subscribe
          (
            (items) => 
            {
              this.itemsRight = items;
            }
          )
    }

}

