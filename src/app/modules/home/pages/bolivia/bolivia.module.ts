import { BoliviaRoutingModule } from './bolivia-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BoliviaPageComponent } from './components/bolivia-page/bolivia-page.component';
import { DepartmentComponent } from './components/department/department.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { TableComponent } from './components/table/table.component';
@NgModule({
  declarations: [BoliviaPageComponent, DepartmentComponent, TableComponent],
  imports: [CommonModule, SharedModule, MaterialModule, BoliviaRoutingModule],
  entryComponents: [],
})
export class BoliviaModule {}
