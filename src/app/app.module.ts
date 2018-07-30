import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RestApiService} from './services/rest-api.service';
import {HttpClientModule} from '@angular/common/http';
import {FilterFlagsComponent} from './components/filter-flags.component';
import {SortFilterService} from './services/sort-filter.service';
import {ItemsComponent} from './components/items.component';
import {DndService} from './services/dnd.service';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    FilterFlagsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [RestApiService, SortFilterService, DndService],
  bootstrap: [AppComponent]
})
export class AppModule {}
