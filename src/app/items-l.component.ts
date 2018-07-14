import { Component, Input } from "@angular/core";
import { Functions } from "./functions.service";

@Component ({
    selector: "items-l",
    template: ` <span>{{ itemL.name }}</span>
                <div class="ml-auto d-flex">
                <div 
                *ngFor="let flag of itemL.flags"    
                class="flags {{functions.enumToString(flag)}}" 
                ></div>
                </div>`
})

export class ItemsLComponent {

    @Input() itemL: any;

    constructor(public functions:Functions) {}

}