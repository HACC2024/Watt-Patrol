import { Component } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

interface SimpleSliderModel {
  value: number;
  options: Options;
}

@Component({
  selector: 'app-day-night-slider',
  templateUrl: './day-night-slider.component.html',
  styleUrl: './day-night-slider.component.scss'
})
export class DayNightSliderComponent {
  // 2 = day, 1 = evening, 0 = night -> default is day
  public timeOfDay: number = 2; 
  
  daytimeSlider: SimpleSliderModel = {
    value: this.timeOfDay,
    options: {
      floor: 0,
      ceil: 2,
      vertical: true
    }
  };

}