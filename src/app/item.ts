import { Flags } from './flags';
//import { stringToEnum } from './functions';
export class Item {

    name: string = '';
    flags: Array<Flags> = [];

    
    constructor(json_item?: any) 
    {
        if (!json_item) return;
        this.name = json_item['name'];
        for (var flag of json_item['flags'])
        {
            this.flags.push(Flags.stringToEnum(flag));
        }
    }
}
