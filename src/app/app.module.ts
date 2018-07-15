import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ItemsLComponent } from './items-l.component';
import { RestApiService } from './rest-api.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NameFilter } from './name-filter.pipe';
import { NameSort } from './name-sort.pipe';
import { ItemsRComponent } from './items-r.component';
import { CheckboxFilterPipe } from './checkbox-filter.pipe'; 
import { NgDragDropModule } from 'ng-drag-drop';
import { FilterFlags } from './filter-flags.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsLComponent,
    ItemsRComponent,
    NameFilter,
    NameSort,
    CheckboxFilterPipe,
    FilterFlags
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    NgDragDropModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [RestApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
