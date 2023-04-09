import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [
    NotificationsComponent
  ],
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [
    NotificationsComponent
  ]
})
export class NotificationsModule 
{
}
