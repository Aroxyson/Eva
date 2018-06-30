// import { Pipe, PipeTransform, Input } from '@angular/core';
// import { Items } from './items';

// @Pipe({name: 'NameFilter'})

// export class NameFilter implements PipeTransform {

//     @Input() items: Items;

//     transform(items: Items, searchString: any): any  {        
//         console.log('searchString', searchString);
//         return searchString
//             ? clients.filter(client => client.name.toLowerCase().indexOf(searchString) !== -1)
//             : clients;
//     };
//     }