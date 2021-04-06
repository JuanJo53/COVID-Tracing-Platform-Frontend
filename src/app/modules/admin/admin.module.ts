import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
@NgModule({
  declarations: [HomeAdminComponent],
  imports: [CommonModule, SharedModule, AdminRoutingModule],
  entryComponents: [],
})
export class AdminModule {}
