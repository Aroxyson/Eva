import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../item';

@Pipe({
    name: 'filter',
    pure: false
})

export class NameFilter implements PipeTransform {

    transform(items: Item[], searchText: string): Item[] {
        if(!items) return []; //если объект для сравнения не передан, вернуть пустой массив
        if(!searchText) return items; //если сравниваемая строка не передана, вернуть исходный объект

        searchText = searchText.toLowerCase();
        
        return items.filter( item => {
            return item.name.toLowerCase().includes(searchText);
        });
       }
    }