import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'app/guards/auth.guard';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { RateCalculationLimaCallaoComponent } from './operations/rate-calculation/lima-callao/lima-callao.component';
import { RateCalculationProvinceComponent } from './operations/rate-calculation/province/province.component';


export const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent, data: {title: 'Dashboard'}}
        ]
    },
    {
        path: 'calculo-tarifas',
        component: PagesComponent,
        children: [
            { path: 'lima-callao', component: RateCalculationLimaCallaoComponent, data: {title: 'Calculo Tarifas Lima y Callao'}},
            { path: 'provincia', component: RateCalculationProvinceComponent, data: {title: 'Calculo Tarifas Provincia'}}
        ],
        runGuardsAndResolvers: 'always'
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule]
})
export class PagesRoutingModule {}