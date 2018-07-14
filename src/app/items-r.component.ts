import { Component, Input } from "@angular/core";
import { Functions } from "./functions.service";
@Component ({
    selector: "items-r",
    template: ` <span>{{ itemR.name }}</span>
                <div class="ml-auto d-flex">
                <div 
                *ngFor="let flag of itemR.flags"    
                class="flags {{functions.enumToString(flag)}}" 
                ></div>
                </div>`
})

export class ItemsRComponent {

    @Input() itemR: any;

    constructor(public functions:Functions) {}

}

