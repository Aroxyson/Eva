import { Component, Input } from "@angular/core";
import { FlagType } from "./flags";
import { Item } from "./item";

@Component ({
    selector: "items-r",
    template: ` <span>{{ itemR.name }}</span>
                <div class="ml-auto d-flex">
                <div 
                *ngFor="let flag of itemR.flags"    
                class="flags {{FlagType[flag]}}" 
                ></div>
                
                </div>`
})

export class ItemsRComponent {

    @Input() itemR: Item;
    FlagType = FlagType;

}

