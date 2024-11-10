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
  @Output() solarPanelToggled: EventEmitter<any> = new EventEmitter<any>();

  // Appliance state
  isRefrigeratorOn: boolean = false;
  isWasherOn: boolean = false;
  isDryerOn: boolean = false;
  isACOn: boolean = false;
  isOvenOn: boolean = false;
  isLightOn: boolean = false;
  isTVOn: boolean = false;
  isCeilingFanOn: boolean = false;
  isPorchLightOn: boolean = false;
  isSolarPanelOn: boolean = false;
  
  // Audio elements
  private refrigeratorOnElement: HTMLAudioElement | undefined;  
  private refrigeratorOffElement: HTMLAudioElement | undefined;
  private washerOnElement: HTMLAudioElement | undefined;
  private washerOffElement: HTMLAudioElement | undefined;
  private dryerOnElement: HTMLAudioElement | undefined;
  private dryerOffElement: HTMLAudioElement | undefined;
  private acOnElement: HTMLAudioElement | undefined;
  private acOffElement: HTMLAudioElement | undefined;
  private ovenOnElement: HTMLAudioElement | undefined;
  private ovenOffElement: HTMLAudioElement | undefined;
  private lightOnElement: HTMLAudioElement | undefined;
  private lightOffElement: HTMLAudioElement | undefined;
  private tvOnElement: HTMLAudioElement | undefined;
  private tvOffElement: HTMLAudioElement | undefined;
  private ceilingfanOnElement: HTMLAudioElement | undefined;
  private ceilingfanOffElement: HTMLAudioElement | undefined;
  private porchlightOnElement: HTMLAudioElement | undefined;
  private porchlightOffElement: HTMLAudioElement | undefined;


  // Appliance energy consumption data
  private applianceEnergy: Object[] = (applianceEnergy as any).default;

  ngOnInit(): void {
    this.preloadImages();
    this.preloadAudio();
  }

  preloadImages() {
    const images = [
      'assets/images/refrigerator-on.png',
      'assets/images/refrigerator-off.png',
      'assets/images/washer-on.png',
      'assets/images/washer-off.png',
      'assets/images/dryer-on.png',
      'assets/images/dryer-off.png',
      'assets/images/ac-on.png',
      'assets/images/ac-off.png',
      'assets/images/oven-on.png',
      'assets/images/oven-off.png',
      'assets/images/light-on.png',
      'assets/images/light-off.png',
      'assets/images/tv-on.png',
      'assets/images/tv-off.png',
      'assets/images/ceiling-fan-on.png',
      'assets/images/ceiling-fan-off.png',
      'assets/images/porch-light-on.png',
      'assets/images/porch-light-off.png',
      'assets/images/solar-panel-on.png',
      'assets/images/solar-panel-off.png',
    ];

    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }

  preloadAudio() {
    this.refrigeratorOnElement = new Audio('assets/sounds/refrigerator-on.wav');
    this.refrigeratorOffElement = new Audio('assets/sounds/refrigerator-off.wav');
    this.washerOnElement = new Audio('assets/sounds/washer-on.wav');
    this.washerOffElement = new Audio('assets/sounds/washer-off.wav');
    this.dryerOnElement = new Audio('assets/sounds/dryer-on.wav');
    this.dryerOffElement = new Audio('assets/sounds/dryer-off.wav');
    this.acOnElement = new Audio('assets/sounds/ac-on.wav');
    this.acOffElement = new Audio('assets/sounds/ac-off.wav');
    this.ovenOnElement = new Audio('assets/sounds/oven-on.wav');
    this.ovenOffElement = new Audio('assets/sounds/oven-off.wav');
    this.lightOnElement = new Audio('assets/sounds/light-on.wav');
    this.lightOffElement = new Audio('assets/sounds/light-off.wav');
    this.tvOnElement = new Audio('assets/sounds/tv-on.wav');
    this.tvOffElement = new Audio('assets/sounds/tv-off.wav');
    this.ceilingfanOnElement = new Audio('assets/sounds/ceilingfan-on.wav');
    this.ceilingfanOffElement = new Audio('assets/sounds/ceilingfan-off.wav');
    this.porchlightOnElement = new Audio('assets/sounds/porchlight-on.wav');
    this.porchlightOffElement = new Audio('assets/sounds/porchlight-off.wav');
  }

  toggleAppliance(e: any) {
    const element = e.target;
    const isActive = this.getApplianceState(element.id);

    // Play audio on toggle event
    this.playAudio(element.id);

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
    switch (element) {
      case 'refrigerator':
        this.isRefrigeratorOn = !this.isRefrigeratorOn;
        return this.isRefrigeratorOn;
      case 'washer':
        this.isWasherOn = !this.isWasherOn;
        return this.isWasherOn;
      case 'dryer':
        this.isDryerOn = !this.isDryerOn;
        return this.isDryerOn;
      case 'ac':
        this.isACOn = !this.isACOn;
        return this.isACOn;
      case 'oven':
        this.isOvenOn = !this.isOvenOn;
        return this.isOvenOn;
      case 'light':
        this.isLightOn = !this.isLightOn;
        return this.isLightOn;
      case 'tv':
        this.isTVOn = !this.isTVOn;
        return this.isTVOn;
      case 'ceiling-fan':
        this.isCeilingFanOn = !this.isCeilingFanOn;
        return this.isCeilingFanOn;
      case 'porch-light':
        this.isPorchLightOn = !this.isPorchLightOn;
        return this.isPorchLightOn;
      default:
        return false;
    }
  }

  playAudio(elememnt: string) {
    switch (elememnt) {
      case 'refrigerator':
        if (this.isRefrigeratorOn) {
          // Pause 'off' sound
          this.refrigeratorOffElement?.pause();
          // Play 'on' sound
          this.refrigeratorOnElement?.play();
          this.refrigeratorOnElement!.currentTime = 0;
        }
        else {
          // Pause 'on' sound
          this.refrigeratorOnElement?.pause();
          // Play 'off' sound
          this.refrigeratorOffElement?.play();
          this.refrigeratorOffElement!.currentTime = 0;
        }
        break;
      case 'washer':
        if (this.isWasherOn) {
          // Pause 'off' sound
          this.washerOffElement?.pause();
          // Play 'on' sound
          this.washerOnElement?.play();
          this.washerOnElement!.currentTime = 0;
        }
        else {
          // Pause 'on' sound
          this.washerOnElement?.pause();
          // Play 'off' sound
          this.washerOffElement?.play();
          this.washerOffElement!.currentTime = 0;
        }
        break;
      case 'dryer':
        if (this.isDryerOn) {
          // Pause 'off' sound
          this.dryerOffElement?.pause
          // Play 'on' sound
          this.dryerOnElement?.play();
          this.dryerOnElement!.currentTime = 0;
        }
        else {
          // Pause 'on' sound
          this.dryerOnElement?.pause();
          // Play 'off' sound
          this.dryerOffElement?.play();
          this.dryerOffElement!.currentTime = 0;
        }
        break;
      case 'ac':
        if (this.isACOn) {
          // Pause 'off' sound
          this.acOffElement?.pause();
          // Play 'on' sound
          this.acOnElement?.play();
          this.acOnElement!.currentTime = 0;

        } else {
          // Pause 'on' sound
          this.acOnElement?.pause();
          // Play 'off' sound
          this.acOffElement?.play();
          this.acOffElement!.currentTime = 0;
        }
        break;
      case 'oven':
        if (this.isOvenOn) {
          // Pause 'off' sound
          this.ovenOffElement?.pause
          // Play 'on' sound
          this.ovenOnElement?.play();
          this.ovenOnElement!.currentTime = 0;
        } else {
          // Pause 'on' sound
          this.ovenOnElement?.pause();
          // Play 'off' sound
          this.ovenOffElement?.play();
          this.ovenOffElement!.currentTime = 0;
        }
        break;
      case 'light':
        if (this.isLightOn) {
          // Pause 'off' sound
          this.lightOffElement?.pause();
          // Play 'on' sound
          this.lightOnElement?.play();
          this.lightOnElement!.currentTime = 0;
        } else {
          // Pause 'on' sound
          this.lightOnElement?.pause();
          // Play 'off' sound
          this.lightOffElement?.play();
          this.lightOffElement!.currentTime = 0;
        }
        break;
      case 'tv':
        if (this.isTVOn) {
          // Pause 'off' sound
          this.tvOffElement?.pause();
          // Play 'on' sound
          this.tvOnElement?.play();
          this.tvOnElement!.currentTime = 0;
        } else {
          // Pause 'on' sound
          this.tvOnElement?.pause();
          // Play 'off' sound
          this.tvOffElement?.play();
          this.tvOffElement!.currentTime = 0;
        }
        break;
      case 'ceiling-fan':
        if (this.isCeilingFanOn) {
          // Pause 'off' sound
          this.ceilingfanOffElement?.pause();
          // Play 'on' sound
          this.ceilingfanOnElement?.play();
          this.ceilingfanOnElement!.currentTime = 0;
        } else {
          // Pause 'on' sound
          this.ceilingfanOnElement?.pause();
          // Play 'off' sound
          this.ceilingfanOffElement?.play();
          this.ceilingfanOffElement!.currentTime = 0;
        }
        break;
      case 'porch-light':
        if (this.isPorchLightOn) {
          // Pause 'off' sound
          this.porchlightOffElement?.pause();
          // Play 'on' sound
          this.porchlightOnElement?.play();
          this.porchlightOnElement!.currentTime = 0;
        } else {
          // Pause 'on' sound
          this.porchlightOnElement?.pause();
          // Play 'off' sound
          this.porchlightOffElement?.play();
          this.porchlightOffElement!.currentTime = 0;
        }
        break;
      default:
        break;
    }

  }

  toggleSolarPanel(e: any) {
    const element = e.target;
    this.isSolarPanelOn = !this.isSolarPanelOn;

    this.solarPanelToggled.emit(this.isSolarPanelOn);
  }

  // Gets a daily kWh consumption for the appliance toggled.
  getEnergyConsumption(applianceId: string) {
    // console.log(this.applianceEnergy);
    return this.applianceEnergy.find((appliance: any) => appliance.name === applianceId);
  }


}
