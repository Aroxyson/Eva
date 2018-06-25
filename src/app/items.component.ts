import { Component, Input } from "@angular/core";


@Component ({
    selector: "items",
    template: `<div class="bg-success col-12 mb-1 mt-1 border">
                <span>{{ item.name }}</span>
               </div>`
})

export class ItemsComponent {

    @Input() item: ItemsComponent;
}