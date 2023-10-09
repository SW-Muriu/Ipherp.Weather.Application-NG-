import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AppService } from '../shared/services/app.service';
import { LoaderService } from '../layout/loader/loader.service';
import { HelperService } from '../shared/services/helper.service';
import { WeatherIconsService } from '../shared/services/weather-icons/weather-icons.service';
import * as wiDataByCode from '../shared/services/weather-icons/weather-icons.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  unitSystem: string;
  wiDataByCode: any; 
  // private unitSystem: string; 
  // private 

  
  constructor(
    private http: HttpClient, 
    private appManService: AppService, 
    private loaderManService: LoaderService,
    private helperManService: HelperService, 
    private weatherIconManService: WeatherIconsService, 
  ) {
    this.unitSystem = appManService.getUnitSystem();
    this.wiDataByCode = wiDataByCode; 
   }
   
}
