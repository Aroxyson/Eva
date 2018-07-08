import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'checkfilter',
    pure: false
})
export class CheckboxFilterPipe implements PipeTransform {
  transform(items: any, checkedFlags: Array<any>): any {
    console.log('Filtering ..');
    console.log('CheckboxFilterPipe::'+checkedFlags);
    if (checkedFlags && Array.isArray(items)) {
      if (!checkedFlags || checkedFlags.length === 0) { return items; }
      
      Array.prototype.diff = function(a) {
        return this.filter(function(i) {return !(a.indexOf(i) > -1);});
      };

      console.log('Полное вхождение');

      return items.filter( item => 
        {
          //console.log(checkedFlags.diff(item.flags));
          return (checkedFlags.diff(item.flags).length === 0) ? item : false
        });
  }
}
}