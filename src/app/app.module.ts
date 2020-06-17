import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpRequestsComponent } from './http-requests/http-requests.component';
import { HttpClientModule } from '@angular/common/http';
import { YouTubeSearchComponent } from './you-tube-search/you-tube-search.component';
import { SearchBoxComponent } from './you-tube-search/search-box.component';
import { SearchResultComponent } from './you-tube-search/search-result.component';
import { youTubeSearchInjectables } from './you-tube-search/you-tube-search.injectables';

@NgModule({
  declarations: [
    AppComponent,
    HttpRequestsComponent,
    YouTubeSearchComponent,
    SearchBoxComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [youTubeSearchInjectables],
  bootstrap: [AppComponent]
})
export class AppModule { }
