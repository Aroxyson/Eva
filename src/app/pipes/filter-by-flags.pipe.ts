import { PipeTransform, Pipe } from "@angular/core";
import { Item } from "../item";
import { FlagType } from "../enums/flags";

@Pipe({
    name: 'flagFilter',
    pure: false
})

export class FilterByFlags implements PipeTransform {

  is_contain_all(item: Item, checkedFlags: FlagType[]): boolean
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

  is_contain_any(item:Item, checkedFlags: FlagType[]): boolean
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

  transform(items: Item[], checkedFlags: FlagType[]): Item[]
  {
    if (!checkedFlags || checkedFlags.length === 0) { return items; }
    return items.filter
      (item =>{return this.is_contain_all(item, checkedFlags)});
  }
}
