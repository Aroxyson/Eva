import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'sort'})

export class NameSort implements PipeTransform {

    transform(items: any[], path: string[], order:number): any[] {

        return items.sort((a: any, b: any) => {
            // We go for each property followed by path
            path.forEach(property => {
                a = a[property];
                b = b[property];
            })
        
            // Order * (-1): We change our order
            return a > b ? order : order * (- 1);
        })
    }
}