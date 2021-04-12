import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ChartsModule } from 'ng2-charts';
import { WorldPageComponent } from './components/world-page/world-page.component';
import { WorldRoutingModule } from './world-routing.module';
import { TableComponent } from './components/table/table.component';
import { MapComponent } from './components/map/map.component';
import { ChartComponent } from './components/chart/chart.component';
@NgModule({
  declarations: [
    WorldPageComponent,
    TableComponent,
    MapComponent,
    ChartComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ChartsModule,
    WorldRoutingModule,
  ],
  entryComponents: [],
})
export class WorldModule {}
