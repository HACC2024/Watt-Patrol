import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { createInvalidObservableTypeError } from 'rxjs/internal/util/throwUnobservableError';


@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrl: './house.component.scss',
})
export class HouseComponent implements OnInit {
  @Output() itemToggled: EventEmitter<any> = new EventEmitter<any>();

  isACOn: boolean = false;

  ngOnInit(): void {
    this.preloadACOn();
  }

  preloadACOn() {
    const img = new Image();
    img.src = 'assets/images/house/ac.png';
  }

  toggleGlow(e: any) {
    const element = e.target;
    const glowElement = e.target.previousElementSibling;

    element.classList.toggle('active');
    glowElement.classList.toggle('active');

    if (element.id === "ac") this.isACOn = !this.isACOn;

    if (glowElement.classList.contains("active")) {
      this.itemToggled.emit(element.id);
    } else {
      this.itemToggled.emit('');
    }
  }
}
