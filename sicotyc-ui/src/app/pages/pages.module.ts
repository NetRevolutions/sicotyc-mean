import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Modules
import { ComponentsModule } from 'app/components/components.module';
import { SharedModule } from 'app/shared/shared.module';

// Components
import { PagesComponent } from './pages.component';


@NgModule({
  declarations: [
    PagesComponent,
    // Aca se coloca los demas componentes que haga falta
  ],
  exports: [
    PagesComponent,
    // Aca se coloca los demas componentes que haga falta
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,    
    ComponentsModule
  ]  
})
export class PagesModule { }
