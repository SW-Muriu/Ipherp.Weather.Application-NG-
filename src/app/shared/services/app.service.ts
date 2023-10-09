import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { appConfig } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private unitSystem!: string;

  constructor(
    private localStorageService: LocalstorageService
  ) {
    this.unitSystem = this.localStorageService.get("unit") || appConfig.defaultUnit;
  }


  getUnitSystem(): string {
    return this.unitSystem; 
  }

  updateUnitSystem (unitSystem: string): void {
    this.localStorageService.set('unit', unitSystem); 

    setTimeout(() => window.location.reload(),  300);
  }

}
