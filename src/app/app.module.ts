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

@NgModule({
  declarations: [
    AppComponent,
    ItemsLComponent,
    ItemsRComponent,
    NameFilter,
    NameSort
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [RestApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
