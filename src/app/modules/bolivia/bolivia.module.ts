import { BoliviaRoutingModule } from './bolivia-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BoliviaPageComponent } from './components/bolivia-page/bolivia-page.component';
import { DepartmentComponent } from './components/department/department.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { TableComponent } from './components/table/table.component';
import { ChartComponent } from './components/chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { ClientDatasetsComponent } from '../home/pages/client-datasets/client-datasets.component';
import { MapComponent } from './components/map/map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    BoliviaPageComponent,
    DepartmentComponent,
    TableComponent,
    ChartComponent,
    ClientDatasetsComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    BoliviaRoutingModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [],
})
export class BoliviaModule {}
