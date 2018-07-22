import { FlagType, FlagsHelpers } from './enums/flags';

export class Item {

    name: string = '';
    flags: FlagType[] = [];

    constructor(json_item?: any) {
        if (!json_item) return;
        this.name = json_item.name;
        for (let flag of json_item.flags)
        {
            this.flags.push(FlagsHelpers.stringToEnum(flag));
        }
    }
}
