import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [
    MessagesComponent
  ]
})
export class MessagesModule 
{
}
