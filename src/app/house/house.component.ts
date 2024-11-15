import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { createInvalidObservableTypeError } from 'rxjs/internal/util/throwUnobservableError';
import * as applianceEnergy from './applianceEnergy.json';

interface ApplianceAudioElements {
  [key: string]: ApplianceAudio;
}

interface ApplianceAudio {
  on: HTMLAudioElement;
  off: HTMLAudioElement;
}

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrl: './house.component.scss',
})
export class HouseComponent implements OnInit {
  @Output() itemToggled: EventEmitter<any> = new EventEmitter<any>();
  @Output() solarPanelToggled: EventEmitter<any> = new EventEmitter<any>();


  private applianceAudioElements: ApplianceAudioElements = {};  // Holds all appliance audio elements.
  private shutdownAudioElement: HTMLAudioElement = new Audio();

  // Appliance energy consumption data
  private applianceEnergy: Object[] = (applianceEnergy as any).default;

  // off = false, on = true;
  appliances: { [key: string]: boolean } = {
    "ac": false,
    "ceiling-fan": false,
    "dryer": false,
    "light": false,
    "oven": false,
    "porch-light": false,
    "refrigerator": false,
    "solar-panel": false,
    "tv": false,
    "washer": false
  };

  ngOnInit(): void {
    this.preloadImages();
    this.preloadAudio();
  }

  /* Allows browser to fetch and cache images.*/
  preloadImages() {
    for (const appliance in this.appliances) {
      const img = new Image();
      img.src = `assets/images/house/${appliance}.png`;
      img.src = `assets/images/house/${appliance}_glow.png`;
    }
  }

  preloadAudio() {
    for (const appliance in this.appliances) {
      if (appliance === "solar-panel") continue;  // Skip solar panel.

      this.applianceAudioElements[appliance] = {
        on: new Audio(`assets/audio/house/${appliance}-on.wav`),
        off: new Audio(`assets/audio/house/${appliance}-off.wav`)
      }
    }
    this.shutdownAudioElement.src = 'assets/audio/house/shutdown.wav';
  }

  toggleAppliance(e: any) {
    const element = e.target;
    const isActive = this.getApplianceState(element.id);

    // Play audio on toggle event
    if (element.id !== "solar-panel") this.playAudio(element.id);

    if (isActive) {
      // Pass the energy consumption data on toggle event emission
      const energyConsumption = this.getEnergyConsumption(element.id);
      this.itemToggled.emit(energyConsumption);

    } else {
      const energyConsumption = this.getEnergyConsumption(element.id) as { [key: string]: any };
      this.itemToggled.emit(energyConsumption["name"].concat("-off"));
    }
  }

  getApplianceState(element: string) {
    return this.appliances[element] = !this.appliances[element];
  }

  playAudio(element: string) {
    if (this.appliances[element]) {
      this.applianceAudioElements[element].off.pause();
      this.applianceAudioElements[element].off.currentTime = 0;
      this.applianceAudioElements[element].on.play();
    } else {
      this.applianceAudioElements[element].on.pause();
      this.applianceAudioElements[element].on.currentTime = 0;
      this.applianceAudioElements[element].off.play();
    }
  }

  // Gets a daily kWh consumption for the appliance toggled.
  getEnergyConsumption(applianceId: string) {
    return this.applianceEnergy.find((appliance: any) => appliance.name === applianceId);
  }

  turnOffAllAppliances(): void {
    for (const appliance in this.appliances) {
      this.appliances[appliance] = false;
      if (appliance !== "solar-panel") {
        this.applianceAudioElements[appliance].on.pause();
        this.applianceAudioElements[appliance].on.currentTime = 0;
      }
    }
    this.shutdownAudioElement.play();
  }
}
