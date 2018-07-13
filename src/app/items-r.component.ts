import { Component, Input } from "@angular/core";
@Component ({
    selector: "items-r",
    template: ` <span>{{ itemR.name }}</span>
                <div class="ml-auto d-flex">
                <div 
                *ngFor="let flag of itemR.flags"    
                class="flags {{flag}}" 
                ></div>
                </div>`
})

export class ItemsRComponent {

    @Input() itemR: any;
    @Input() itemInfo: any;

}

