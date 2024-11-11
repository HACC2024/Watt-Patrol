import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'watt-patrol';
  itemToggled = '';
  time = 2;

  onItemToggled(e: any) {
    this.itemToggled = e;
  }

  onTimeChange(e: any) {
    this.time = e;
    this.updateBodyBackground();
  }

  updateBodyBackground(): void {
    const backgroundColor = this.getBackgroundColor();
    document.body.style.backgroundColor = backgroundColor;
  }

    // Map timeOfDay value to background colors
    getBackgroundColor(): string {
      switch (this.time) {
        case 0:
          return '#2c3e50';
        case 1:
          return '#ffcc66';
        case 2:
          return '#9ed5eb';
        default:
          return '#9ed5eb';
      }
    }

  constructor(){}
}