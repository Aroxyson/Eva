import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './item';

@Pipe({
    name: 'sort',
    pure: false
})

export class NameSort implements PipeTransform {

    transform(items: Array<Item>, order:number): any[] {

        return items.sort((a: Item, b: Item) => 
        {
            return a.name > b.name ? order : order * (- 1);
        })
    }
}