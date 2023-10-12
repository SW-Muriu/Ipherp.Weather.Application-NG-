import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoaderComponent } from './layout/loader/loader.component';
import { SearchBarComponent } from './layout/search-bar/search-bar.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { WeatherComponent } from './weather/weather.component';
import { CityCardComponent } from './springboard/city-card/city-card.component';
import { DateComponent } from './springboard/date/date.component';
import { ClockComponent } from './springboard/clock/clock.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoaderComponent,
    SearchBarComponent,
    NotFoundComponent,
    WeatherComponent,
    CityCardComponent,
    DateComponent,
    ClockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
