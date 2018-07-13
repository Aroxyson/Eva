import { Component, Input } from "@angular/core";

@Component ({
    selector: "items-l",
    template: ` <span>{{ itemL.name }}</span>
                <div class="ml-auto d-flex">
                <div 
                *ngFor="let flag of itemL.flags"    
                class="flags {{flag}}" 
                ></div>
                </div>`
})

export class ItemsLComponent {

    @Input() itemL: any;
    @Input() itemInfo: any;

}