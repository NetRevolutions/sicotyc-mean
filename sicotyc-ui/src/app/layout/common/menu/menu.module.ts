import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    RouterModule.forChild([]),
    SharedModule
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
