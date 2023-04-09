import { NgModule } from '@angular/core';
import { ControlSidebarComponent } from './control-sidebar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [
    ControlSidebarComponent
  ],
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [
    ControlSidebarComponent
  ]
})
export class ControlSidebarModule { }
