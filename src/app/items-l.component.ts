import { Component, Input } from "@angular/core";

@Component ({
    selector: "items-l",
    template: `<div class="bg-success col-12 mb-1 mt-1 border d-flex" [class.border-danger]="itemL == itemInfo">
                <span>{{ itemL.name }}</span>
                
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