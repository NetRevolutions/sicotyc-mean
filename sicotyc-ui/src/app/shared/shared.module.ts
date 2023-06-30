import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { BreadcrumbsComponent } from './common/breadcrumbs/breadcrumbs.component';
import { MenuComponent } from './common/menu/menu.component';
import { MessagesComponent } from './common/messages/messages.component';
import { NotificationsComponent } from './common/notifications/notifications.component';
import { SearchComponent } from './common/search/search.component';
import { ControlSidebarComponent } from './layout/control-sidebar/control-sidebar.component';
import { MainFooterComponent } from './layout/main-footer/main-footer.component';
import { MainSidebarComponent } from './layout/main-sidebar/main-sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { UserOptionsComponent } from './common/user-options/user-options.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // Common
    BreadcrumbsComponent,
    MenuComponent,
    MessagesComponent,
    NotificationsComponent,
    SearchComponent,
    // Layout
    ControlSidebarComponent,
    MainFooterComponent,
    MainSidebarComponent,
    NavbarComponent,
    UserOptionsComponent
  ],
  exports: [
    // Common
    BreadcrumbsComponent,
    MenuComponent,
    MessagesComponent,
    NotificationsComponent,
    SearchComponent,
    // Layout
    ControlSidebarComponent,
    MainFooterComponent,
    MainSidebarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule    
  ]  
})
export class SharedModule { }
