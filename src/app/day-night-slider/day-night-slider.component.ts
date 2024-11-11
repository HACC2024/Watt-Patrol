import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() timeOfDayChange = new EventEmitter<number>();

  // 2 = day, 1 = evening, 0 = night -> default is day
  public timeOfDay: number = 2; 
  
  daytimeSlider: SimpleSliderModel = {
    value: this.timeOfDay,
    options: {
      floor: 0,
      ceil: 2,
      vertical: true,
      hideLimitLabels: true,
      hidePointerLabels: true
    }
  };

  // Method to handle slider change
  onSliderChange(value: number): void {
    this.timeOfDay = value;
    this.timeOfDayChange.emit(this.timeOfDay);
  }

  // Method to get class based on the slider value
  getTimeOfDayClass(): string {
    switch (this.timeOfDay) {
      case 0:
        return 'night-mode';
      case 1:
        return 'evening-mode';
      case 2:
      default:
        return 'day-mode';
    }
  }

}