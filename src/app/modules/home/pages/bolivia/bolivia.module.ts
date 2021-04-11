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
import { ClientDatasetsComponent } from '../client-datasets/client-datasets.component';
import { MapComponent } from './components/map/map.component';
// import { AgmCoreModule } from '@agm/core';
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
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAGIQRmtZ_eX9EKPehZd6snel0OC-5c9bs',
    // }),
  ],
  entryComponents: [],
})
export class BoliviaModule {}
