import {FlagType} from '../enums/flags';

export class Item {
    name = '';
    flags: FlagType[] = [];

    constructor(json_item?: any) {
        if (!json_item) {
          return;
        }
        this.name = json_item.name;
        for (let flag of json_item.flags) {
            this.flags.push(flag);
        }
    }
}
