import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WeatherService } from 'src/app/weather/weather.service';

@Injectable({
  providedIn: 'root'
})
export class CityCardService {

  constructor(
    private weatherManService: WeatherService, 
    private router: Router, 
  ) { }

  resolve (route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.weatherManService.createResponseWeatherByCity(route.params['city'])
    .catch((error)=> {
      if (error.status === 404) {
        this.router.navigate(['/service/search'], {queryParams: {
          city: route.params['city']
        }})
      }
    })
  }
}
