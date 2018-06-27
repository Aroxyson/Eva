import { Component, Input } from "@angular/core";

@Component ({
    selector: "items",
    template: `<div class="bg-success col-12 mb-1 mt-1 border">
                <span>{{ item.name }}</span>
                <img *ngIf="item.sun" alt="Sun" src="{{item.sun}}">
                <img *ngIf="item.heart" alt="heart" src="{{item.heart}}">
                <img *ngIf="item.flash" alt="flash" src="{{item.flash}}">
                <img *ngIf="item.flower" alt="flower" src="{{item.flower}}">
               </div>`
})

export class ItemsComponent {

    @Input() item: ItemsComponent;


}