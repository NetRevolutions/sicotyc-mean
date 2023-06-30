import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { SharedModule } from 'app/shared/shared.module';

// Components
import { PagesComponent } from './pages.component';
import { RequestServiceEvaluationComponent } from './operations/request-service-evaluation/request-service-evaluation.component';


@NgModule({
  declarations: [
    PagesComponent,
    RequestServiceEvaluationComponent,
    // Aca se coloca los demas componentes que haga falta
  ],
  exports: [
    PagesComponent,
    // Aca se coloca los demas componentes que haga falta
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ]  
})
export class PagesModule { }
