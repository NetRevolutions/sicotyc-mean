import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {MainMenuComponent} from '@pages/main-menu/main-menu.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import { LimaCallaoComponent } from '@pages/operations/rate-calculation/lima-callao/lima-callao.component';
import { ProvinceComponent } from '@pages/operations/rate-calculation/province/province.component';
import { RequestServiceEvaluationComponent } from '@pages/operations/request-service-evaluation/request-service-evaluation.component';
import { WorkOrderCreationComponent } from '@pages/work-order/work-order-creation/work-order-creation.component';
import { ControlDocumentsComponent } from '@pages/work-order/control-documents/control-documents.component';
import { WorkOrderStateComponent } from '@pages/work-order/work-order-state/work-order-state.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent,
                data: { title: 'Perfil de Usuario'}
            },
            {
                path: 'blank',
                component: BlankComponent,
                data: { title: ''}
            },
            {
                path: 'sub-menu-1',
                component: SubMenuComponent,
                data: { title: 'Sub-menu 1'}
            },
            {
                path: 'sub-menu-2',
                component: BlankComponent,
                data: { title: 'Sub-menu 2'}
            },
            {
                path: 'operaciones',
                children: [
                    {
                        path: 'calculo-tarifas',                    
                        children: [
                            {
                                path: 'lima-callao',
                                component: LimaCallaoComponent,
                                data: { title: 'Calculo de Tarifas - Lima y Callao'}           
                            },
                            {
                                path: 'provincia',
                                component: ProvinceComponent,
                                data: { title: 'Calculo de Tarifas - Provincia'}
                            }
                        ]
                    },
                    {
                        path: 'solicitud-servicio-evaluacion',
                        component: RequestServiceEvaluationComponent,
                        data: { title: 'Solicitud de Servicio - Evaluacion'}
                    }
                ]
            },
            {
                path: 'ordenes-de-trabajo',
                children: [
                    {
                        path: 'creacion',
                        component: WorkOrderCreationComponent,
                        data: { title: 'Creacion'}
                    },
                    {
                        path: 'control-documentos',
                        component: ControlDocumentsComponent,
                        data: { title: 'Control de Documentos'}
                    },
                    {
                        path: 'estado',
                        component: WorkOrderStateComponent,
                        data: { title: 'Estado de Documentos'}
                    }
                ]
            },
            {
                path: '',
                component: DashboardComponent,
                data: { title: 'Dashboard'}
            }
        ]
    },
    {
        path: 'external',
        component: MainComponent, // Crear un componente external (como MainComponent) que no requiera autenticacion
        canActivate: [NonAuthGuard],
        canActivateChild: [NonAuthGuard],
        children: [
            {
                path: 'calculo-tarifas',
                children: [
                    {
                        path: 'lima-callao',
                        component: LimaCallaoComponent,
                        data: { title: 'Calculo de Tarifas - Lima y Callao'}           
                    },
                    {
                        path: 'provincia',
                        component: ProvinceComponent,
                        data: { title: 'Calculo de Tarifas - Provincia'}
                    }
                ]
            }
        ]
    },    
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
