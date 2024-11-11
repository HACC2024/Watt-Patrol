import { Component, AfterViewInit, ElementRef, Renderer2, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as applianceEnergy from '../house/applianceEnergy.json';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-energy-meter',
  templateUrl: './energy-meter.component.html',
  styleUrl: './energy-meter.component.scss'
})
export class EnergyMeterComponent implements AfterViewInit, OnChanges {
  @Input() itemToggled: any;
  @Input() timeOfDay: number = 2;
  public rate?: number;
  public energyValue: number = 0;
  public energyValueString: string = this.energyValue.toString().padStart(6, '0') + '&nbsp;';
  public energyCost: number = 0;
  public energyCostString: string = "0.0¢ "
  private delay: number = -1; // initial delay between each circle
  private duration: number = 4000; // initial duration for each circle’s animation
  private circleRadius: number = 8;
  private svg!: SVGSVGElement;
  private path!: SVGPathElement;
  private pathLength!: number;
  private itemsMap: Map<string, number>
  private lastTimestamp: number = 0; // initial delay between each circle
  private lastDirection: number = 1; // initial direction of the last circle 1 = forward, -1 = backward

  private max_kWh: number = (applianceEnergy as any).default.reduce((acc: number, curr: any) => {
    if (curr["daily-kWh"] > 0) {
      return acc + curr["daily-kWh"];
    }
    return acc;
  }, 0);

  @ViewChild('energy_value_span') energyValueSpan!: ElementRef;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {
    this.itemsMap = new Map<string, number>();
  }

  renderEnergyValue(): void {
    if (this.energyValue == 0) {
      this.energyValue = 0;
      this.delay = -1;
    } else {
      let scaleFactor = 0.4 + (0.6 * (this.max_kWh - this.energyValue) / this.max_kWh);
      this.delay = 800 * scaleFactor;
    }
    /** 
     * If we ever want to add blinking error effect for some cases:
     * if (condition) {
     *   this.energyValueString = '&nbsp;Error&nbsp;';
     *   this.renderer.addClass(this.energyValueSpan.nativeElement, 'blink');
     *   this.delay = -1;
     * }
    */

    this.energyValueString = (this.energyValue < 0 ? '-' : ' ') + Math.abs(this.energyValue).toFixed(4).toString().padStart(7, '0');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['timeOfDay'] !== undefined) {

      //Rates: Cents/kWh 
      if (this.timeOfDay == 0) {
        // Night time
        this.rate = 41.3998;
      }
      if (this.timeOfDay == 1) {
        // Evening time
        this.rate = 62.0997;
      }
      if (this.timeOfDay == 2) {
        // Day time
        this.rate = 20.6999;
      }
    }

    console.log("changes", changes);

    if (changes['itemToggled'] !== undefined) {
      if (this.itemToggled !== undefined) {
        if (typeof this.itemToggled == "string") {
          let itemKey = this.itemToggled.slice(0, -4);
          if (this.itemsMap.has(itemKey)) {
            this.energyValue -= this.itemsMap.get(itemKey) ?? 0;
            this.itemsMap.delete(this.itemToggled);
          }
        }
  
        if (typeof this.itemToggled == "object") {
          this.itemsMap.set(this.itemToggled["name"], this.itemToggled["daily-kWh"]);
          this.energyValue += this.itemToggled["daily-kWh"];
        }
  
        this.renderEnergyValue();
      }  
    }

    this.energyCost = this.rate! * this.energyValue;
    this.energyCostString = this.formatCost(this.energyCost);
  }

  // Function to convert the cost to a readable string (in cents or dollars)
  formatCost(costInCents: number) {
    // Round small values near zero down to 0
    if (Math.abs(costInCents) < 0.01) {
      costInCents = 0;
    } else {
      // Round up to the nearest cent
      costInCents = Math.ceil(costInCents);
    }

    if (costInCents >= 100) {
      // If 100 cents or more, convert to dollars and cents
      let dollars = Math.floor(costInCents / 100); // Calculate dollars
      let cents = costInCents % 100; // Calculate remaining cents
      return `$${dollars}.${cents.toString().padStart(2, '0')}`; // Format as dollars and cents
    } else if (costInCents < 0) {
      return "0¢";
    } else {
      return `${costInCents}¢`; // Return as cents if less than 100
    }
  }


  ngAfterViewInit(): void {
    this.svg = this.elRef.nativeElement.querySelector('svg') as SVGSVGElement;
    this.path = this.elRef.nativeElement.querySelector('#house-to-grid') as SVGPathElement;
    this.pathLength = this.path.getTotalLength();

    requestAnimationFrame(() => this.startAnimationFlow(performance.now()));
  }

  private createCircle(): void {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle") as SVGCircleElement;
    circle.setAttribute("r", this.circleRadius.toString());
    circle.setAttribute("fill", "transparent")
    this.svg.appendChild(circle);

    // circle.addEventListener('animationend', function() {
    //   circle.remove();  // Remove the circle from the DOM
    // });
    // circle.removeAttribute()
    // animateMotion.beginElement();

    this.animateCircle(circle);
  }

  private animateCircle(circle: SVGCircleElement): void {
    const startTime = performance.now();

    const moveCircle = () => {
      const currentTime = performance.now();
      const progress = (currentTime - startTime) / this.duration;
      if (progress < 1) {
        let point = this.path.getPointAtLength(this.pathLength - (progress * this.pathLength));
        if (this.energyValue < 0 || ((this.energyValue == 0) && (this.lastDirection == -1))) {
          this.lastDirection = -1;
          point = this.path.getPointAtLength(progress * this.pathLength);
        } else {
          this.lastDirection = 1;
        }
        circle.setAttribute("cx", point.x.toString());
        circle.setAttribute("cy", point.y.toString());
        circle.setAttribute("fill", "#ff0");
        requestAnimationFrame(moveCircle);
      } else {
        this.svg.removeChild(circle); // Remove the circle once animation is done
      }
    };

    requestAnimationFrame(moveCircle);
  }

  private startAnimationFlow(timestamp: number): void {
    if (this.delay != -1 && timestamp - this.lastTimestamp >= this.delay) {
      this.createCircle();
      this.lastTimestamp = timestamp;
    }

    requestAnimationFrame(() => this.startAnimationFlow(performance.now()));
  }
}
