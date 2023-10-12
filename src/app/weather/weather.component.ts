import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Weather } from './weather';
import { AppService } from '../shared/services/app.service';
import { WeatherService } from './weather.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {
  private _weatherSubscription!: Subscription; 
  weather!: Weather; 
  unitSystem: string; 

  constructor(
    private appManService: AppService, 
    private weatherManService: WeatherService, 
    private route: ActivatedRoute, 
  ){
    this.unitSystem = appManService.getUnitSystem();
  }

 ngOnInit(): void {
  this.route.data.subscribe((data: any)=> {
    this.weather = data.weather;
  }); 

  this._weatherSubscription = this.weatherManService.getWeather().subscribe(weather => {
    this.weather = weather;
  }); 
 }

 ngOnDestroy() {
  this._weatherSubscription.unsubscribe();
 }


}
