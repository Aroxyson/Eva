import { Component, Output, EventEmitter } from "@angular/core";
import { FlagsHelpers, FlagType } from "./flags";

@Component ({
    selector: "filter-flags",
    template: `<div class="checkbox" *ngFor="let flag of filterFlags">
               <input  type="checkbox" id={{flag.name}} 
               (change)="addToCheckedFlags($event.target, flag);sendCheckedFlags()">
               <label for="{{flag.name}}" class="default-bg {{flag.name}}" [class.active]="flag.checked"></label>
               </div>`
})

export class FilterFlags {

    
    public filterFlags: Array<any> = [];
    @Output() checkedFlagsOut:EventEmitter<FlagType[]> = new EventEmitter<FlagType[]>();
    checkedFlags: FlagType[] = [];


    ngOnInit(){
        this.initFilterFlags();
    }

    sendCheckedFlags()
    {
        this.checkedFlagsOut.emit(this.checkedFlags);
        console.log(' this.checkedFlagsOut=', this.checkedFlagsOut);
    }

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
    // for (var flag in FlagType)
    // {
    //     this.filterFlags.push(
    //     {
    //         'name' : flag,
    //         'checked' : false
    //     }
    //     )
    // }
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
        console.log("filterlags::",this.filterFlags);
        console.log("checkedFlags::",this.checkedFlags);
      }
}