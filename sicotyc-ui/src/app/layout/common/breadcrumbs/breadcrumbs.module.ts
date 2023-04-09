import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { BreadcrumbsComponent } from './breadcrumbs.component';



@NgModule({
  declarations: [
    BreadcrumbsComponent
  ],
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [
    BreadcrumbsComponent
  ]
})
export class BreadcrumbsModule 
{ 
}
