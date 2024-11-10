import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EnergyMeterComponent } from './energy-meter/energy-meter.component';
import { HouseComponent } from './house/house.component';
import { DayNightSliderComponent } from './day-night-slider/day-night-slider.component';
import { ApplianceChartComponent } from './appliance-chart/appliance-chart.component';
import { LightbulbComponent } from './lightbulb/lightbulb.component';

// Import FusionChartsModule and the FusionCharts library
import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts and the necessary chart types
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import Widgets from 'fusioncharts/fusioncharts.widgets';

// Initialize FusionCharts with chart modules and theme
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme, Widgets);

@NgModule({
  declarations: [
    AppComponent,
    EnergyMeterComponent,
    HouseComponent,
    DayNightSliderComponent,
    ApplianceChartComponent,
    LightbulbComponent
  ],
  imports: [
    BrowserModule,
    FusionChartsModule, // Include the FusionCharts module
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
