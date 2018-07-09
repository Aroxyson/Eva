import { PipeTransform, Pipe } from "@angular/core";

declare global {
  interface Array<T> {
    diff(array: Array<T>);
  }
}
@Pipe({
    name: 'checkfilter',
    pure: false
})
export class CheckboxFilterPipe implements PipeTransform {
  transform(items: any, checkedFlags: Array<any>): any {
    //console.log('Filtering ..');
    //console.log('CheckboxFilterPipe::'+checkedFlags);
    if (checkedFlags && Array.isArray(items)) {
      if (!checkedFlags || checkedFlags.length === 0) { return items; }
      
      Array.prototype.diff = function(a) {
        return this.filter(function(i) {return !(a.indexOf(i) > -1);});
      };

      return items.filter( item => 
        {
          return (checkedFlags.diff(item.flags).length === 0) ? item : false
        });
  }
}
}