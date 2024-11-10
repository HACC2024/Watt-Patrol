import { Component, OnInit, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import applianceEnergy from './applianceEnergy.json';  // Static import of JSON data

@Component({
  selector: 'app-appliance-chart',
  templateUrl: './appliance-chart.component.html',
  styleUrls: ['./appliance-chart.component.scss']
})
export class ApplianceChartComponent implements AfterViewInit {
  chart: any;
  private labels: string[] = applianceEnergy.map((e: any) => e.name);
  private data: number[] = applianceEnergy.map((e: any) => e['daily-kWh']);

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createChart();
    }, 0);
  }

  createChart() {
    const ctx = (document.getElementById('MyChart') as HTMLCanvasElement).getContext('2d');

    if (ctx) {
      this.chart = new Chart(ctx, {
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
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Appliance'
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
        }
      });
    } else {
      console.error('Canvas context not found.');
    }
  }
}
