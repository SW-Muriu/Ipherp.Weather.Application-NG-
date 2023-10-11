import { Component, Input, Output } from '@angular/core';
import { Weather } from 'src/app/weather/weather';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss']
})
export class CityCardComponent {
  @Input() weather!: Weather;
  @Output() unitSystem: string | undefined; 

}
