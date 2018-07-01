import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filter'})

export class NameFilter implements PipeTransform {

    transform(items: any[], searchText: string): any[] {
        if(!items) return []; //если объект для сравнения не передан, вернуть пустой массив
        if(!searchText) return items; //если сравниваемая строка не передана, вернуть исходный объект

        searchText = searchText.toLowerCase();
        
        return items.filter( it => {
            return it['name'].toLowerCase().includes(searchText);
        });
       }
    }