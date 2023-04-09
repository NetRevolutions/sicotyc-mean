import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MessagesModule } from 'app/layout/common/messages/messages.module';
import { NotificationsModule } from 'app/layout/common/notifications/notifications.module';
import { SearchModule } from 'app/layout/common/search/search.module';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    RouterModule,
    SharedModule,
    MessagesModule,
    NotificationsModule,
    SearchModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
