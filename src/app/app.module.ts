import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RestApiService } from './services/rest-api.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NameFilter } from './pipes/name-filter.pipe';
import { NameSort } from './pipes/name-sort.pipe';
import { FilterByFlags } from './pipes/filter-by-flags.pipe';
import { NgDragDropModule } from 'ng-drag-drop';
import { FilterFlagsComponent } from './components/filter-flags.component';
import { SortFilterService } from './services/sort-filter.service';
import { ItemsComponent} from './components/items.component';
import {DragulaModule} from 'ng2-dragula';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    NameFilter,
    NameSort,
    FilterByFlags,
    FilterFlagsComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    NgDragDropModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    DragulaModule
  ],
  providers: [RestApiService, SortFilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
