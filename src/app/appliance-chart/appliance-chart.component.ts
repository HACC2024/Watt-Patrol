import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import applianceEnergy from './applianceEnergy.json';  // Static import of JSON data
import { color } from 'chart.js/helpers';

@Component({
  selector: 'app-appliance-chart',
  templateUrl: './appliance-chart.component.html',
  styleUrls: ['./appliance-chart.component.scss']
})
export class ApplianceChartComponent implements AfterViewInit {
  chart: any;
  private labels: string[] = applianceEnergy.map((e: any) => this.toTitleCase(e.name));

  toTitleCase(str: string): string {
    if (str.length === 2) {
      return str.toUpperCase();
    } else {
      return str.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    }
  }

  private data: number[] = applianceEnergy.map((e: any) => e['daily-kWh']);
  private images: HTMLImageElement[] = applianceEnergy.map((e: any) => {
    const img = new Image();
    img.src = e.imageUrl;
    return img;
  });

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
        this.images.forEach((img, index) => {
          const x = xAxis.getPixelForValue(index);
          const y = chart.height - 40;
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
