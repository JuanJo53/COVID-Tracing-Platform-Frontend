import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ChartsModule } from 'ng2-charts';
import { WorldRoutingModule } from './world-routing.module';
import { TableComponent } from './components/table/table.component';
import { MapComponent } from './components/map/map.component';
import { ChartComponent } from './components/chart/chart.component';
import { WorldPageComponent } from './components/world-page/world-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    FormsModule,
  ],
  entryComponents: [],
})
export class WorldModule {}
