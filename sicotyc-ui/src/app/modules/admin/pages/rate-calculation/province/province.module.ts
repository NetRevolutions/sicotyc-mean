import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateCalculationProvinceComponent } from './province.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { rateCalculationProvinceRoutes } from './province.routing';



@NgModule({
  declarations: [
    RateCalculationProvinceComponent
  ],
  imports: [
    RouterModule.forChild(rateCalculationProvinceRoutes),
    SharedModule
  ]
})
export class ProvinceModule { }
