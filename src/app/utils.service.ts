import { Injectable } from "@angular/core";
import { FlagType } from "./flags";

@Injectable
    ({
        providedIn: 'root'
    })

export class UtilsService {

    checkedFlags: FlagType[] = [];
    sendCheckedFlags(checkedFlags: FlagType[])
    {
        this.checkedFlags = checkedFlags;
    }

    receiveCheckedFlags():FlagType[]
    {
        console.log('UtilsService::',this.checkedFlags);
        return this.checkedFlags;
    }
}