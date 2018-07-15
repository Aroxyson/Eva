import { Injectable } from "@angular/core";
import { FlagType } from "./flags";
import { Item } from "./item";

@Injectable
    ({
        providedIn: 'root'
    })

export class UtilsService {

    checkedFlags: FlagType[] = [];
    itemInfo: Item = new Item;
    sendCheckedFlags(checkedFlags: FlagType[])
    {
        this.checkedFlags = checkedFlags;
    }

    receiveCheckedFlags():FlagType[]
    {
        console.log('UtilsService::',this.checkedFlags);
        return this.checkedFlags;
    }
    sendItemInfo(item: Item) 
    {
        this.itemInfo = item;
    }

    receiveItemInfo(): Item
    {
        console.log('receiveItemInfo::',this.itemInfo);
        return this.itemInfo;
    }
}