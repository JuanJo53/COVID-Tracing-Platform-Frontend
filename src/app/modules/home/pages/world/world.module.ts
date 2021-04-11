import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ChartsModule } from 'ng2-charts';
import { WorldPageComponent } from './world-page/world-page.component';
import { WorldRoutingModule } from './world-routing.module';
@NgModule({
  declarations: [WorldPageComponent],
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
