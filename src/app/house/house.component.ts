import { Component } from '@angular/core';
import { createInvalidObservableTypeError } from 'rxjs/internal/util/throwUnobservableError';


@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrl: './house.component.scss',
})
export class HouseComponent {
  isACOn: boolean = false;

  toggleGlow(e: any) {
    const element = e.target;
    const glowElement = e.target.previousElementSibling;

    element.classList.toggle('active');
    glowElement.classList.toggle('active');

    if (element.id === "ac") this.isACOn = !this.isACOn;
  }
}
