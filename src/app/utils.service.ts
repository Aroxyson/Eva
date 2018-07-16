import { Injectable } from "@angular/core";
import { FlagType } from "./flags";
import { Item } from "./item";
import { Subject, Observable } from "rxjs";
import { RestApiService } from "./rest-api.service";
import { ItemList } from "./itemList";

@Injectable
    ({
        providedIn: 'root'
    })

export class UtilsService {

    checkedFlags: FlagType[] = [];
    itemInfo: Item = new Item;
    itemsLeft: Item[] = [];
    itemsRight: Item[] = [];

    itemsLeftSubject = new Subject<Item[]>();
    itemsRightSubject = new Subject<Item[]>();

    constructor(private restApiService: RestApiService)
    {
        this.getItems(ItemList.left).subscribe(items => { this.itemsLeft = items; });
        this.getItems(ItemList.right).subscribe(items => { this.itemsRight = items; });
    }

    initItems( itemList: ItemList)
    {
        switch (itemList)
        {
            case ItemList.left:
                this.restApiService
                .receiveItems()
                .subscribe
                ((items) => {this.itemsLeftSubject.next(items);});
                break;
            case ItemList.right:
                this.restApiService
                .receiveItems()
                .subscribe
                ((items) => {this.itemsRightSubject.next(items);});
                break;
        }
    }

    getItems(itemList: ItemList): Observable<any>
    {
        switch (itemList)
        {
            case ItemList.left:
                return this.itemsLeftSubject.asObservable();
            case ItemList.right:
                return this.itemsRightSubject.asObservable();
        }
    }

    sendCheckedFlags(checkedFlags: FlagType[])
    {
        this.checkedFlags = checkedFlags;
    }

    receiveCheckedFlags():FlagType[]
    {
        //console.log('UtilsService::',this.checkedFlags);
        return this.checkedFlags;
    }
    sendItemInfo(item: Item) 
    {
        this.itemInfo = item;
    }

    receiveItemInfo(): Item
    {
        //console.log('receiveItemInfo::',this.itemInfo);
        return this.itemInfo;
    }

    onItemDrop(source: any, target: ItemList)
    { //enum DragDirection
        switch (target)
        {
            case ItemList.right:    
                var indexL = this.itemsLeft.indexOf(source.dragData);
                this.itemsRight.push(source.dragData);
                this.itemsLeft.splice(indexL,1);
                break;
            case ItemList.left:
                var indexR = this.itemsRight.indexOf(source.dragData);
                this.itemsLeft.push(source.dragData);
                this.itemsRight.splice(indexR,1);
                break;
        }
    }
}