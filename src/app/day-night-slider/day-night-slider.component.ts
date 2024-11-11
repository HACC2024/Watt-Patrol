import { AfterViewInit, Component, EventEmitter, Inject, Output } from '@angular/core';
import { Options, AllowUnsafeHtmlInSlider } from '@angular-slider/ngx-slider';

interface SimpleSliderModel {
  value: number;
  options: Options;
}

@Component({
  selector: 'app-day-night-slider',
  templateUrl: './day-night-slider.component.html',
  styleUrl: './day-night-slider.component.scss'
})
export class DayNightSliderComponent implements AfterViewInit{
  @Output() timeValue: EventEmitter<number> = new EventEmitter<number>();
  // 2 = day, 1 = evening, 0 = night -> default is day
  public timeOfDay: number = 2;

  ngAfterViewInit() {
    this.timeValue.emit(this.timeOfDay);
  }
  
  daytimeSlider: SimpleSliderModel = {
    value: this.timeOfDay,
    options: {
      floor: 0,
      ceil: 2,
      vertical: true,
      showTicksValues: false,
      showTicks: true,
      stepsArray: [
        {value: 0, legend: '<img src="assets/images/sky/night.PNG" alt="Night Moon" class="time-images" /><span class="time-ranges">Overnight <br> (9pm - 9am)</span>'},
        {value: 1, legend: '<img src="assets/images/sky/evening.PNG" alt="Evening Sun" class="time-images" /><span class="time-ranges">Evening Peak <br> (5pm - 9pm)</span>'},
        {value: 2, legend: '<img src="assets/images/sky/day.PNG" alt="Morning Sun" class="time-images" /><span class="time-ranges">Daytime <br>(9am - 5pm)</span>'},
      ],
      hideLimitLabels: true,
      hidePointerLabels: true,
    }
  };

  onValueChange(value: number) {
    this.timeOfDay = value;
    this.timeValue.emit(value);
  }

}