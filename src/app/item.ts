import { FlagType, FlagsHelpers } from './flags';

export class Item {

    name: string = '';
    flags: Array<FlagType> = [];

    
    constructor(json_item?: any) 
    {
        if (!json_item) return;
        this.name = json_item['name'];
        for (var flag of json_item['flags'])
        {
            this.flags.push(FlagsHelpers.stringToEnum(flag));
        }
    }
}
