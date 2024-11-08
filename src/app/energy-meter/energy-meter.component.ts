import { Component, AfterViewInit, ElementRef, Renderer2, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-energy-meter',
  templateUrl: './energy-meter.component.html',
  styleUrl: './energy-meter.component.scss'
})
export class EnergyMeterComponent implements AfterViewInit, OnChanges {
  @Input() itemToggled: any;
  public energyValue: number = 0;
  public energyValueString: string = this.energyValue.toString().padStart(6, '0') + '&nbsp;';
  private delay: number = 600; // 600ms delay between each circle
  private duration: number = 3000; // duration of each circle's animation along the path
  private circleRadius: number = 10;
  private svg!: SVGSVGElement;
  private path!: SVGPathElement;
  private pathLength!: number;
  private itemsMap: Map<string, number>;



  @ViewChild('energy_value_span') energyValueSpan!: ElementRef;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {
    this.itemsMap = new Map<string, number>();
  }

  renderEnergyValue(): void {
    if (this.energyValue < 0) {
      this.energyValue = 0;
    }
    if (this.energyValue >= 999999) {
      this.energyValueString = '&nbsp;Error&nbsp;';
      this.renderer.addClass(this.energyValueSpan.nativeElement, 'blink');
    }
    else {
      this.energyValueString = this.energyValue.toFixed(4).padStart(6, '0');
    }
  }

  ngOnChanges(): void {
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

  ngAfterViewInit(): void {
    this.svg = this.elRef.nativeElement.querySelector('svg') as SVGSVGElement;
    this.path = this.elRef.nativeElement.querySelector('#myPath') as SVGPathElement;
    this.pathLength = this.path.getTotalLength();

    this.startAnimationFlow();
  }

  private createCircle(): void {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle") as SVGCircleElement;
    circle.setAttribute("r", this.circleRadius.toString());
    circle.setAttribute("fill", "blue");
    this.svg.appendChild(circle);

    this.animateCircle(circle);
  }

  private animateCircle(circle: SVGCircleElement): void {
    const startTime = performance.now();

    const moveCircle = () => {
      const currentTime = performance.now();
      const progress = (currentTime - startTime) / this.duration;

      if (progress < 1) {
        const point = this.path.getPointAtLength(progress * this.pathLength);
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

  private startAnimationFlow(): void {
    this.createCircle();
    setInterval(() => this.createCircle(), this.delay);
  }
}