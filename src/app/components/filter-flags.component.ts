import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FlagType} from '../enums/flags';

@Component ({
    selector: 'filter-flags',
    templateUrl: './filter-flags.component.html'
})

export class FilterFlagsComponent implements OnInit {
  @Output() checkedFlagsOut: EventEmitter<FlagType[]> = new EventEmitter<FlagType[]>();

  filterFlags: Array<any> = [];
  checkedFlags: FlagType[] = [];

  constructor() {}

  ngOnInit() {
    this.initFilterFlags();
  }

  sendCheckedFlags() {
    this.checkedFlagsOut.emit(this.checkedFlags);
  }

  initFilterFlags() {
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

  addToCheckedFlags(event, flag: any) {
    const index = this.checkedFlags.indexOf(flag.name);
    if (event.target.checked) {
      if (index === -1) {
          this.checkedFlags.push(flag.name);
          this.checkedFlags = this.checkedFlags.slice();
          flag.checked = true;
      }
    } else {
      if (index !== -1) {
        this.checkedFlags.splice(index, 1);
        this.checkedFlags = this.checkedFlags.slice();
        flag.checked = false;
      }
    }
    this.sendCheckedFlags();
  }
}
