import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../item';
import { SortOrder } from '../enums/order';

@Pipe({
    name: 'sort',
    pure: false
})

export class NameSort implements PipeTransform {

    transform(items: Array<Item>, order:SortOrder): Item[] {

        var comparator;
        var directCompareByName = function(a: Item, b: Item) 
        {
            return a.name > b.name ? 1 : -1;
        }

        switch (order)
        {
            case SortOrder.straight:
            comparator = directCompareByName;
            break;
            
            case SortOrder.reverse:
            comparator = function(a: Item, b: Item) 
            {
                return directCompareByName(a,b)*(-1);
            };
            break;
        }
        return items.sort(comparator);
        
    }
}