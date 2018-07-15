import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { FlagsHelpers, FlagType } from "./flags";
import { UtilsService } from "./utils.service";

@Component ({
    selector: "filter-flags",
    template: `<div class="checkbox" *ngFor="let flag of filterFlags">
               <input  type="checkbox" id={{flag.name}} 
               (change)="addToCheckedFlags($event.target, flag)">
               <label for="{{flag.name}}" class="default-bg {{flag.name}}" [class.active]="flag.checked"></label>
               </div>`
})

export class FilterFlags implements OnInit{
    
    filterFlags: Array<any> = [];
    checkedFlags: FlagType[] = [];

    constructor(private utilsService:UtilsService){}

    public ngOnInit()
    {
        this.initFilterFlags();
    }

    
    // sendCheckedFlags()
    // {
    //     this.checkedFlagsOut.emit(this.checkedFlags);
    //     console.log(' this.checkedFlagsOut=', this.checkedFlagsOut);
    // }

    initFilterFlags():void
    {
      var flagsLength:number = FlagsHelpers.getSize();
      for (var i=0; i<flagsLength; i++)
      { console.log('flagt',FlagType[i]);
        this.filterFlags.push
        (
            {
              'name' : FlagType[i],
              'checked' : false
            }
        )
      }

      console.log('initFilterFlags::',this.filterFlags);
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
        console.log("filterlags::",this.filterFlags);
        console.log("checkedFlags::",this.utilsService.receiveCheckedFlags());
      }
}