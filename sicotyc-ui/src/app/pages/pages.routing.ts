import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { RateCalculationLimaCallaoComponent } from './rate-calculation/lima-callao/lima-callao.component';
import { RateCalculationProvinceComponent } from './rate-calculation/province/province.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        children: [
            { path: '', component: DashboardComponent, data: {title: 'Dashboard'}}
        ]
    },
    {
        path: 'calculo-tarifas',
        component: PagesComponent,
        children: [
            { path: 'lima-callao', component: RateCalculationLimaCallaoComponent, data: {title: 'Calculo Tarifas Lima - Callao'}},
            { path: 'provincia', component: RateCalculationProvinceComponent, data: {title: 'Calculo Tarifas Provincia'}}
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule]
})
export class PagesRoutingModule {}