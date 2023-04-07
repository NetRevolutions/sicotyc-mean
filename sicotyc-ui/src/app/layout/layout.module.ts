import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { SharedModule } from 'app/shared/shared.module';

const layoutModules = [

];

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    SharedModule,
    ...layoutModules
  ],
  exports: [
    LayoutComponent,
    ...layoutModules
  ]
})
export class LayoutModule { }
