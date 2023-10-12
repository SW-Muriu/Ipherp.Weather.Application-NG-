import { Component, Input, Output } from '@angular/core';
import { apiConfig } from 'src/app/config';
import { Weather } from 'src/app/weather/weather';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss']
})
export class CityCardComponent {
  @Input() weather!: Weather;
  @Output()  unitSystem!: string | number; 

  measureOfTemp!: string;
  measureOfWindSpeed!: string; 
  measureOfPressure!: string; 


  ngOnInit(){
    // const measurementUnits = apiConfig.measurementUnits[this.unitSystem]; 
    const measurementUnits = apiConfig.measurementUnits["metric"]; 

    this.measureOfTemp = measurementUnits.temperature; 
    this.measureOfWindSpeed = measurementUnits.windSpeed;
    this.measureOfPressure = measurementUnits.pressure
  }

}
