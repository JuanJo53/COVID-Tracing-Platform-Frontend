import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { DatasetsComponent } from './pages/datasets/datasets.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
@NgModule({
  declarations: [HomeAdminComponent, DatasetsComponent, UploadFileComponent],
  imports: [CommonModule, SharedModule, MaterialModule, AdminRoutingModule],
  entryComponents: [],
})
export class AdminModule {}
