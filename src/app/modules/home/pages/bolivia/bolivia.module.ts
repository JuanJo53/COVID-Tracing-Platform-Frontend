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
@NgModule({
  declarations: [
    BoliviaPageComponent,
    DepartmentComponent,
    TableComponent,
    ChartComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    BoliviaRoutingModule,
    ChartsModule,
  ],
  entryComponents: [],
})
export class BoliviaModule {}
