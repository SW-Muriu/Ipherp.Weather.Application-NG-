import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class WeatherIconsService {
  private wiDataByCode: any;

  constructor() { }

  getIconClassNameByCode(code: number, sunsetTimestamp: number = 0): string {
    const classPrefix = 'wi wi-';
    let iconClassname = this.wiDataByCode[code].icon;
    let dayPrefix = '';
    if (!(code > 699) && !(code < 899))  {
      const dateNowTimestamp = Math.round(Date.now() / 1000);
      dayPrefix = (sunsetTimestamp && (dateNowTimestamp>sunsetTimestamp)) ? 'night-' : 'day-';

      if (sunsetTimestamp && dateNowTimestamp > sunsetTimestamp && iconClassname === 'sunny') {
        dayPrefix = 'night-clear';
        iconClassname = '';
      }
    }
    return `${classPrefix}${dayPrefix}${iconClassname}`;
  }
}
