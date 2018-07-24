import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { SortFilterService } from '../services/sort-filter.service';
import { FlagType, FlagsHelpers } from '../enums/flags';

@Component
({
    selector: 'filter-flags',
    template: `<div class="checkbox" *ngFor="let flag of filterFlags">
               <input  type="checkbox" id={{flag.name}}
               (change)="addToCheckedFlags($event.target, flag)">
               <label for="{{flag.name}}" class="default-bg {{flag.name}}" [class.active]="flag.checked"></label>
               </div>`
})

export class FilterFlagsComponent implements OnInit {
  @Output() checkedFlagsOut: EventEmitter<FlagType[]> = new EventEmitter<FlagType[]>();

  filterFlags: Array<any> = [];
  checkedFlags: FlagType[] = [];
  FlagsType = FlagType;

  constructor(private utilsService: SortFilterService) {}

  ngOnInit() {
      this.initFilterFlags();
  }

  sendCheckedFlags() {
    this.checkedFlagsOut.emit(this.checkedFlags);
  }

  initFilterFlags() {
    const flagsLength: number = FlagsHelpers.getSize();
    // for (let i = 0; i < flagsLength; i++) {
    //   this.filterFlags.push
    //   (
    //       {
    //         'name': FlagType[i],
    //         'checked': false
    //       }
    //   );
    // }
    for (let value in FlagType) {
      this.filterFlags.push
      (
        {
          'name': value,
          'checked': false
        }
      );
    }
  }

  addToCheckedFlags(input: HTMLInputElement, flag: any) {
      const index = this.checkedFlags.indexOf(flag.name);
      if (input.checked === true) {
        if (index == -1) {
            this.checkedFlags.push(flag.name);
            flag.checked = true;
        }
      } else {
        if (index != -1) {
          this.checkedFlags.splice(index, 1);
          flag.checked = false;
        }
      }
      console.log(this.checkedFlags);
      this.sendCheckedFlags();
    }
}
