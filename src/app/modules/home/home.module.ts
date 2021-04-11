import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { ClientDatasetsComponent } from './pages/client-datasets/client-datasets.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
@NgModule({
  declarations: [HomeComponent, ClientDatasetsComponent],
  imports: [CommonModule, SharedModule, MaterialModule, HomeRoutingModule],
  entryComponents: [],
})
export class HomeModule {}
