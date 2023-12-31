import { Component, EventEmitter, Input, Output } from '@angular/core';
import { apiConfig, appConfig } from 'src/app/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() currentUnitSystem!: string; 
  @Output() changeUnit: EventEmitter<string> = new EventEmitter();
  
  isUnitSwitcherChecked= false

  ngOnInit() {
    this.isUnitSwitcherChecked = this.currentUnitSystem === appConfig.defaultUnit; 
  }

  onChangeUnitSwitcher() {
    // const newUnit = this.isUnitSwitcherChecked ? "imperial" : "metric";
    const unitSystems = Object.keys(apiConfig.measurementUnits);
    const unitIndex = this.isUnitSwitcherChecked ? 1 :0; // ternary expression 
    this.changeUnit.emit(unitSystems[unitIndex]);
  }
  

}
