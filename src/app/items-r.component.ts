import { Component, Input } from "@angular/core";
@Component ({
    selector: "items-r",
    template: ` <div class="bg-success col-12 mb-1 mt-1 border d-flex" [class.border-danger]="itemR == itemInfo">
                <span>{{ itemR.name }}</span>
               

                <div 
                *ngFor="let flag of itemR.flags"    
                [className]="flag" 
                ></div>
               </div>`
})

export class ItemsRComponent {

    @Input() itemR: ItemsRComponent;
    @Input() itemInfo: ItemsRComponent;

}

