import { Component } from "@angular/core";
import { UtilsService } from "../services/utils.service";
import { FlagType, FlagsHelpers } from '../enums/flags';

@Component ({
    selector: "filter-flags",
    template: `<div class="checkbox" *ngFor="let flag of filterFlags">
               <input  type="checkbox" id={{flag.name}} 
               (change)="addToCheckedFlags($event.target, flag)">
               <label for="{{flag.name}}" class="default-bg {{flag.name}}" [class.active]="flag.checked"></label>
               </div>`
})

export class FilterFlags
{
    
    filterFlags: Array<any> = [];
    checkedFlags: FlagType[] = [];
    FlagsType = FlagType;

    constructor(private utilsService:UtilsService){}

    ngOnInit()
    {
        this.initFilterFlags();
    }

    initFilterFlags():void
    {
      var flagsLength:number = FlagsHelpers.getSize();
      for (var i=0; i<flagsLength; i++)
      {
        this.filterFlags.push
        (
            {
              'name' : FlagType[i],
              'checked' : false
            }
        )
      }
    }

    addToCheckedFlags( input: HTMLInputElement, flag: any  ) {
        var index = this.checkedFlags.indexOf(FlagsHelpers.stringToEnum(flag.name));
        if  (input.checked === true) {
          if (index == -1) {
              this.checkedFlags.push(FlagsHelpers.stringToEnum(flag.name));
              flag.checked = true;
          }
        }
        else {
          if (index != -1) {
            this.checkedFlags.splice(index,1);
            flag.checked = false;
          }
        }
        this.utilsService.sendCheckedFlags(this.checkedFlags);
      }
}