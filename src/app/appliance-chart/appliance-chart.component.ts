import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import applianceEnergy from './applianceEnergy.json';  // Static import of JSON data

@Component({
  selector: 'app-appliance-chart',
  templateUrl: './appliance-chart.component.html',
  styleUrls: ['./appliance-chart.component.scss']
})
export class ApplianceChartComponent implements AfterViewInit {
  chart: any;
  private labels: string[] = applianceEnergy.map((e: any) => this.toTitleCase(e.name));

  toTitleCase(str: string): string {
    if(str.length === 2) {
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
          ctx.drawImage(img, x - 15, y, 30, 30);
        });
      }
    };

    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Daily Power Consumption (kWh)',
            data: this.data,
            backgroundColor: [
              'blue', 'green', 'red', 'purple', 'orange', 'cyan', 'magenta', 'yellow', 'pink'
            ]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            bottom: 40
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: false,
              text: 'Appliance'
            },
            ticks: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Daily Power Consumption (kWh)'
            }
          }
        }
      },
      plugins: [imagePlugin]
    });
  }
}
