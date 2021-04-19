import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RecommendationsComponent } from './pages/recommendations/recommendations.component';
import { InfvaccinationComponent } from './pages/infvaccination/infvaccination.component';
@NgModule({
  declarations: [
    HomeComponent,
    RecommendationsComponent,
    InfvaccinationComponent,
  ],
  imports: [CommonModule, SharedModule, MaterialModule, HomeRoutingModule],
  entryComponents: [],
})
export class HomeModule {}
