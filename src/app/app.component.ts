import { Component, OnInit } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { ItemsComponent } from './items.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RestApiService, ItemsComponent]
})
export class AppComponent implements OnInit{
  public items : ItemsComponent[] = [];

  constructor( private RestApiService:RestApiService ) {}

  public ngOnInit() {
    this.RestApiService
      .getAllItems()
      .subscribe(
        (items) => {
          this.items = items;
          console.log(this.items);
        }
      );
  }
}