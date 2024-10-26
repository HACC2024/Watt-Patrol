import { Component } from '@angular/core';


@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrl: './house.component.scss',
})
export class HouseComponent {
  toggleGlow(e: any) {
    const element = e.target;
    const glowElement = e.target.previousElementSibling;

    element.classList.toggle('active');
    glowElement.classList.toggle('active');
  }
}
