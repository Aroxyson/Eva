import { Flags } from './flags';
import { stringToEnum } from './functions';
import { Functions } from './functions.service';
export class Item {

    name: string = '';
    flags: Array<Flags> = [];

    
    constructor(json_item?: any, private Functions?:Functions) 
    {
        if (!json_item) return;
        this.name = json_item['name'];
        for (var flag of json_item['flags'])
        {
            this.flags.push(Functions.stringToEnum(flag));
        }
    }
}
