import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AppService } from '../shared/services/app.service';
import { LoaderService } from '../layout/loader/loader.service';
import { HelperService } from '../shared/services/helper.service';
import { WeatherIconsService } from '../shared/services/weather-icons/weather-icons.service';
import * as wiDataByCode from '../shared/services/weather-icons/weather-icons.service';
import { Observable, Subject, throwError, interval, map, catchError, startWith, switchMap } from 'rxjs';
import { Weather } from './weather';
import { apiConfig, appConfig } from '../config';
// import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private unitSystem: string;
  private wiDataByCode: any;
  private subscribers: any = {};
  private weather: Subject<Weather> = new Subject<Weather>();
  private weatherUpdateInterval = apiConfig.updateInterval.weather;
  CurrentWeatherTimestamp!: number;
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

  getWeather(): Subject<Weather> {
    return this.weather
  }

  getCurrentWeatherTimestamp(): number {
    return this.CurrentWeatherTimestamp;
  }

  getWeatherByCurrentLocation(): Promise<any> {
    this.showLoader()

    //default city location
    if (this.subscribers.city) {
      this.subscribers.city.unsubscribe();
    }

    // if different city is select  

    // return new Promise((resolve, reject))

    // return new Promise((resolve, reject) = > {
    //   window.navigator.geoLocation.getCurreentPosition((position)=> {
    //     const {latitude, longitude } = position.coords; 

    //     this.subscribers.city = this.getWeatherByCurrentLocation( latitude, longitude).subscribe((weather) => {
    //       resolveForwardRef(weather.city); 

    //       this.hideLoader(); 
    //     }, reject (error);
    //     this.hideLoader
    //     )
    //     )
    //   })
    // })

    return new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        this.subscribers.city = this._getWeatherByLocation(latitude, longitude).subscribe((weather: { city: any; }) => {
          resolve(weather.city);

          this.hideLoader();
        });
      }, (error) => {
        if (error.code === 1) { // if user didn't approve geolocation
          this.subscribers.city = this._getWeatherByLocation(
            appConfig.defaultCity.coord.latitude,
            appConfig.defaultCity.coord.longitude
          ).subscribe((weather: { city: any; }) => {
            resolve(weather.city);

            this.hideLoader();
          });
        } else {
          console.error(error);
          this.hideLoader();
        }
      });
    });
  };

  createResponseWeatherByCity(city: string): Promise<any> {
    this.showLoader();
  if (this.subscribers.city){
    this.subscribers.city.unsubscribe();
  }

  return new Promise((resolve, reject) => {
    this.subscribers.city = this.getWeatherByCity(city).subscribe((weather)=>{
      resolve (weather); 
      this.hideLoader(); 
    }, 
    (error)=> {
      reject(error);
      this.hideLoader();
    });
  });
  }


  // _getWeatherByLocation(latitude: number, longitude: number): Observable<any> {
  //   return Observable
  //     .interval(this.weatherUpdateInterval)
  //     .startWith(0)
  //     .switchMap(() =>
  //       this.http.get(
  //         `${apiConfig.host}/weather?appid=${apiConfig.appId}/&lat=${latitude}&lon=${longitude}&units=${this.unitSystem}`
  //       ).map((response: Response) => response.json())
  //       .map((data: any) => {
  //           const weather = this.handleResponseWeatherData(data);

  //           this.weather.next(weather);
  //           return weather;
  //         }).catch(this.handleError)
  //     );
  // }

  // added a catchError() operator at the end of the Observable chain to handle any errors that occur.
  // getWeatherByLocation(latitude: number, longitude: number): Observable<any> {
  //   return Observable
  //     .interval(this.weatherUpdateInterval)
  //     .startWith(0)
  //     .switchMap(() =>
  //       this.http.get(
  //         `${apiConfig.host}/weather?appid=${apiConfig.appId}/&lat=${latitude}&lon=${longitude}&units=${this.unitSystem}`
  //       ).pipe(
  //         map((response: Response) => response.json()),
  //         map((data: any) => this.handleResponseWeatherData(data)),
  //         catchError(this.handleError)
  //       )
  //     );
  // }
  

  // gethWeatherByLocation(latitude: number, longitude: number): Observable<any> {
  //   return Observable
  //     .interval(this.weatherUpdateInterval)
  //     .startWith(0)
  //     .switchMap(() =>
  //       this.http.get(
  //         `${apiConfig.host}/weather?appid=${apiConfig.appId}/&lat=${latitude}&lon=${longitude}&units=${this.unitSystem}`
  //       ).pipe(
  //         map((response: Response) => response.json()),
  //         map((data: any) => {
  //           const weather = this.handleResponseWeatherData(data);
  
  //           this.weather.next(weather);
  //           return weather;
  //         }),
  //         catch(this.handleError)
  //       );
  //     )
  // }




  //finally found a way through it: 

  //****************************************************************************
  //   Import Statements:
// Import interval from 'rxjs' to resolve the 'Property 'interval' does not exist on type 'typeof Observable' error.
// Import the necessary operators and functions from 'rxjs/operators' (e.g., map, startWith, switchMap, catchError) to replace the old chaining style (Observable.operatorName) with the new pipeable operators.
// Pipeable Operators:
// Replace the chaining of operators with the pipe method, which is used to compose observable operations in RxJS version 6.x.
// Type Casting:

// Remove the unnecessary type casting (e.g., response.json()) in the code, as the response is already of type any. */
//******************************************************************************************************** */
_getWeatherByLocation(latitude: number, longitude: number): Observable<any> {
  return interval(this.weatherUpdateInterval).pipe(
    startWith(0),
    switchMap(() =>
      this.http.get(
        `${apiConfig.host}/weather?appid=${apiConfig.appId}/&lat=${latitude}&lon=${longitude}&units=${this.unitSystem}`
      ).pipe(
        map((response: any) => response),
        map((data: any) => {
          const weather = this.handleResponseWeatherData(data);

          this.weather.next(weather);
          return weather;
        }),
        catchError(this.handleError)
      )
    )
  );
};

getWeatherByCity(city: string): Observable<any> {
  return interval(this.weatherUpdateInterval)
  . pipe(startWith(0), 
  switchMap(()=>
  this.http.get(
    `${apiConfig.host}/weather?appId=${apiConfig.appId}&q=${city}&units=${this.unitSystem}`
  )
  .pipe(
    map((response: any)=> response), 
    map((data: any)=> {
      const weather = this.handleResponseWeatherData(data);

      this.weather.next(weather);
      return weather; 
    }),
    catchError(this.handleError)
  )))
}


  private handleResponseWeatherData(responseData: any): Weather {
    const {
      name, main, weather, wind, sys, dt
    } = responseData; 

    this.CurrentWeatherTimestamp = dt;
    const updateAt = new Date().getTime();
    const iconClassname = this.weatherIconManService.getIconClassNameByCode(weather[0].id, sys.sunset);
    const temparature = Math.round(main.temp);
    const pressureInHpa = Math.round(main.pressure);
    const pressure = (this.unitSystem === appConfig.defaultUnit) ? this.helperManService.getPressureInMmHg(pressureInHpa) : pressureInHpa;
    const windDegrees = Math.round(wind.deg);
    const windDirection = this.helperManService.getWindDirection(windDegrees);
    const windBeaufortScale = this.helperManService.getWindBeaufortScaleByMeterInSecond(wind.speed);
    const sunriseTime = sys.sunrise * 1000;
    const sunsetTime = sys.sunset * 1000; 

    return new Weather (
      updateAt, 
      name, 
      iconClassname, 
      temparature, 
      main.humidity, 
      pressure, 
      weather[0].description, 
      sunsetTime, 
      sunriseTime, 
      windDirection, 
      wind.speed, 
      windBeaufortScale, 
    )
  }

  private handleError(error: any): Observable<any> {
    // return Observable.throw(error.message || error);

    //replaced since Observable.throw was deprecated in the 7th version of rxjs and removed in the 8th version
    return throwError(error.message || error)

  }

  showLoader(): void {
    this.loaderManService.hide();
  };

  hideLoader(): void {
    this.loaderManService.hide();
  }

}
