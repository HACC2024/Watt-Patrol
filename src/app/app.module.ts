import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnergyMeterComponent } from './energy-meter/energy-meter.component';
import { HouseComponent } from './house/house.component';
import { DayNightSliderComponent } from './day-night-slider/day-night-slider.component';
import { ApplianceChartComponent } from './appliance-chart/appliance-chart.component';
import { LightbulbComponent } from './lightbulb/lightbulb.component';


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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
