import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../item';

@Pipe({
    name: 'nameFilter',
    pure: false
})

export class NameFilter implements PipeTransform
{

    transform(items: Item[], searchText: string): Item[]
    {
        let t = Date.now();
        if(!items)
          return [];
        if(!searchText)
          return items;

        searchText = searchText.toLowerCase();

        return items.filter( item =>
            {
                console.log("Process time ", Date.now()-t);
                return item.name.toLowerCase().includes(searchText);
            });
    }
}
