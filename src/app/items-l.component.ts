import { Component, Input } from "@angular/core";

@Component ({
    selector: "items-l",
    template: `<div class="bg-success col-12 mb-1 mt-1 border">
                <span>{{ itemL.name }}</span>
                <img *ngIf="itemL.sun" alt="Sun" src="{{itemL.sun}}">
                <img *ngIf="itemL.heart" alt="heart" src="{{itemL.heart}}">
                <img *ngIf="itemL.flash" alt="flash" src="{{itemL.flash}}">
                <img *ngIf="itemL.flower" alt="flower" src="{{itemL.flower}}">
               </div>`
})

export class ItemsLComponent {

    @Input() itemL: ItemsLComponent;

}