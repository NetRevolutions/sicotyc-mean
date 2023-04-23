import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { RouterModule } from '@angular/router';


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
    NavbarComponent
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
    RouterModule    
  ]  
})
export class SharedModule { }
