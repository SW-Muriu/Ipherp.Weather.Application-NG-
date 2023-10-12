import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { ResolveLocationService } from './shared/services/resolve-location.service';

const routes: Routes = [
  {
    path: '', component: WeatherComponent, redirectTo: '/home'
  }, 
  {
    path: 'home', component: WeatherComponent
  }, 
  // {path: ':city', component: WeatherComponent, resolve: {weather: Ci}}
  {
    // path: "service/search", component: 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
