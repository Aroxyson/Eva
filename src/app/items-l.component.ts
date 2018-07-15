import { Component, Input } from "@angular/core";
import { FlagType } from "./flags";
import { Item } from "./item";

@Component ({
    selector: "items-l",
    template: ` <span>{{ itemL.name }}</span>
                <div class="ml-auto d-flex">
                <div 
                *ngFor="let flag of itemL.flags"    
                class="flags {{FlagType[flag]}}" 
                ></div>
                </div>`
})

export class ItemsLComponent {

    @Input() itemL: Item;
    FlagType = FlagType;

}