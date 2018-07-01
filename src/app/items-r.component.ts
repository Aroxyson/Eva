import { Component, Input } from "@angular/core";

@Component ({
    selector: "items-r",
    template: ` <div class="bg-success col-12 mb-1 mt-1 border">
                <span>{{ itemR.name }}</span>
                <img *ngIf="itemR.sun" alt="Sun" src="{{itemR.sun}}">
                <img *ngIf="itemR.heart" alt="heart" src="{{itemR.heart}}">
                <img *ngIf="itemR.flash" alt="flash" src="{{itemR.flash}}">
                <img *ngIf="itemR.flower" alt="flower" src="{{itemR.flower}}">
               </div>`
})

export class ItemsRComponent {

    @Input() itemR: ItemsRComponent;

}