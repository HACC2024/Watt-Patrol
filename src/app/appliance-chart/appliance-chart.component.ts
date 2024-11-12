import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import applianceEnergy from './applianceEnergy.json';  // Static import of JSON data
import { color } from 'chart.js/helpers';

@Component({
  selector: 'app-appliance-chart',
  templateUrl: './appliance-chart.component.html',
  styleUrls: ['./appliance-chart.component.scss']
})
export class ApplianceChartComponent implements AfterViewInit {
  @ViewChildren('imgElement') images?: QueryList<ElementRef>;
  chart: any;
  private labels: string[] = applianceEnergy.map((e: any) => this.toTitleCase(e.name));

  constructor() {}

  toTitleCase(str: string): string {
    if (str.length === 2) {
      return str.toUpperCase();
    } else {
      return str.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    }
  }

  private data: number[] = applianceEnergy.map((e: any) => e['daily-kWh']);

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createChart();
    }, 0);
  }

  createChart() {
    const imagePlugin = {
      id: 'imagePlugin',
      afterDraw: (chart: any) => {
        const ctx = chart.ctx;
        const xAxis = chart.scales['x'];
        this.images?.forEach((imgRef, index) => {
          const x = xAxis.getPixelForValue(index);
          const y = chart.height - 40;
          const img = imgRef.nativeElement;
          if (img.src.includes("tv")) {
            ctx.drawImage(img, xAxis.getPixelForValue(index) - (80/2), y - 40, 80, 50);
          } else if (img.src.includes("ac")) {
            ctx.drawImage(img, xAxis.getPixelForValue(index) - (90/2), y - 40, 90, 60);
          } else if (img.src.includes("refrigerator")) {
            ctx.drawImage(img, xAxis.getPixelForValue(index) - (60/2), y - 40, 60, 80);
          } else {
            ctx.drawImage(img, xAxis.getPixelForValue(index) - (60/2), y - 40, 60, 60);
          }
        });
      }
    };

    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            backgroundColor: [
              'blue', 'lightgrey', 'red', 'purple', 'orange', 'cyan', 'magenta', 'yellow', 'pink'
            ]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            bottom: 80
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: false,
              color: '#c4c4c4',
            },
            ticks: {
              display: false,
              color: '#c4c4c4',
            },
            grid: {
              display: false,
              color: '#c4c4c4',
              tickColor: '#c4c4c4',
            },
            border: {
              display: false,
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: false,
            },
            grid: { 
              display: false,
              color: '#c4c4c4',
              tickColor: '#c4c4c4'

            },
            ticks: {
              display: false,
              color: '#c4c4c4',
            },
            border: {
              display: false,
            }
          }
        },
        plugins: {
          legend: { display: false }
        }
      },
      plugins: [imagePlugin]
    });
  }
}
