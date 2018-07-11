import { Input } from "@angular/core";

export class Checkboxes {

    //@Input() flag:string;

    public flags: Array<string>;

    constructor(flag: any) {
       this.flags.push(flag);
      // this.flags = flag;
    }
}