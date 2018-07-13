import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sort',
    pure: false
})

export class NameSort implements PipeTransform {

    transform(items: any[], path: string[], order:number): any[] {

        return items.sort((a: any, b: any) => {

            path.forEach(property => {
                a = a[property];
                b = b[property];
            })
    
            return a > b ? order : order * (- 1);
        })
    }
}