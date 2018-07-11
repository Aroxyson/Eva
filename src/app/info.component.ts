import { Input, Component } from "@angular/core";
import { Items } from "./items";

@Component({
    selector: 'info',
    template: `<div class="col-6 text-center border">
               <span>INFO</span><br>
               <span *ngIf="info">{{info.name}}</span>
               <div *ngIf="info">{{info.flags}}</div>
               </div>`
            })

export class InfoComponent {
    @Input() info: Items;

    constructor(){}
}