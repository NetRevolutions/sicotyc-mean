import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateCalculationLimaCallaoComponent } from './lima-callao.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { rateCalculationLimaCallaoRoutes } from './lima-callao.routing';



@NgModule({
  declarations: [
    RateCalculationLimaCallaoComponent
  ],
  imports: [
    RouterModule.forChild(rateCalculationLimaCallaoRoutes),
    SharedModule
  ]
})
export class RateCalculationLimaCallaoModule { }
