import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})

export class UserComponent {
    @Input() item;
}