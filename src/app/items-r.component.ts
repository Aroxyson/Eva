import { Component, Input } from "@angular/core";
@Component ({
    selector: "items-r",
    template: ` <div class="bg-success col-12 mb-1 mt-1 border">
                <span>{{ itemR.name }}</span>
                <img *ngIf="itemR.sun" alt="Sun" src="{{itemR.sun}}" >
                <img *ngIf="itemR.heart" alt="heart" src="{{itemR.heart}}">
                <img *ngIf="itemR.flash" alt="flash" src="{{itemR.flash}}">
                <img *ngIf="itemR.flower" alt="flower" src="{{itemR.flower}}">

                
               </div>`
})

export class ItemsRComponent {

    @Input() itemR: ItemsRComponent;

}

// <img 
//                 *ngFor="let flag of itemR.flags"
//                 class="{{flag}}" style="width:10px;height:10px"
//                 (click)="addFlag(flag)" 
//                 >