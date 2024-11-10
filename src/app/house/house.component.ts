import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { createInvalidObservableTypeError } from 'rxjs/internal/util/throwUnobservableError';
import * as applianceEnergy from './applianceEnergy.json';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrl: './house.component.scss',
})
export class HouseComponent implements OnInit {
  @Output() itemToggled: EventEmitter<any> = new EventEmitter<any>();

  private applianceEnergy: Object[] = (applianceEnergy as any).default;

  isACOn: boolean = false;

  ngOnInit(): void {
    this.preloadACOn();
  }

  preloadACOn() {
    const img = new Image();
    img.src = 'assets/images/house/ac.png';
  }

  toggleAppliance(e: any) {
    const element = e.target;
    const glowElement = e.target.previousElementSibling;

    element.classList.toggle('active');
    glowElement.classList.toggle('active');

    if (element.id === "ac") this.isACOn = !this.isACOn;

    if (glowElement.classList.contains("active")) {
      const energyConsumption = this.getEnergyConsumption(element.id) as { [key: string]: any };
      this.itemToggled.emit(energyConsumption);
      console.log(energyConsumption);
    } else {
      const energyConsumption = this.getEnergyConsumption(element.id) as { [key: string]: any };
      this.itemToggled.emit(energyConsumption["name"].concat("-off"));
    }
  } 

  // Gets a daily kWh consumption for the appliance toggled.
  getEnergyConsumption(applianceId: string) {
    // console.log(this.applianceEnergy);
    return this.applianceEnergy.find((appliance: any) => appliance.name === applianceId);
  }
}
