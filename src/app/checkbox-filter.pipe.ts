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
  is_contain_all(item: any, checkedFlags: Array<any>): boolean
  {
    for (var i=0; i < checkedFlags.length; i++)
    {
      if (item.flags.indexOf(checkedFlags[i])<0)
      {
        return false;
      }
    }
    return true;
  }

  is_contain_any(item: any, checkedFlags: Array<any>): boolean
  {
    for (var i=0; i < checkedFlags.length; i++)
    {
      if (item.flags.indexOf(checkedFlags[i])>=0)
      {
        return true;
      }
    }
    return false;
  }

  transform(items: any, checkedFlags: Array<any>): any {
    if (!checkedFlags || checkedFlags.length === 0) { return items; }
    if (checkedFlags && Array.isArray(items)) { //checkedFlags != null
     // var start = new Date();
      return items.filter
      ( 
        item => 
        {
          //console.log(start - new Date());
          return this.is_contain_all(item, checkedFlags)
        }
      );
  }
}
}