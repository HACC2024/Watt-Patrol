import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'watt-patrol';
  itemToggled = '';

  onItemToggled(e: any) {
    this.itemToggled = e;
  }

  // day night slider code
  backgroundClass: string = 'day-mode'; // Default to day

  // Update the background class based on the time of day
  onTimeOfDayChange(timeOfDay: number): void {
    switch (timeOfDay) {
      case 0:
        this.backgroundClass = 'night-mode';
        break;
      case 1:
        this.backgroundClass = 'evening-mode';
        break;
      case 2:
      default:
        this.backgroundClass = 'day-mode';
        break;
    }
  }
}
