import { Input } from "@angular/core";

export class Checkboxes {

    @Input() flag:string;

    public checkArray: Array<string>;

    // constructor(flag:string) {
    //     this.checkArray.push(flag);
    //     console.log(this.checkArray);
    // }

    constructor(){}
}