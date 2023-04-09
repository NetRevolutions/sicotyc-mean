import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { SharedModule } from 'app/shared/shared.module';
import { BreadcrumbsModule } from './common/breadcrumbs/breadcrumbs.module';
import { MenuModule } from './common/menu/menu.module';
import { RouterModule } from '@angular/router';
import { MessagesModule } from './common/messages/messages.module';
import { NotificationsModule } from './common/notifications/notifications.module';
import { SearchModule } from './common/search/search.module';
import { ControlSidebarModule } from './layouts/control-sidebar/control-sidebar.module';
import { MainFooterModule } from './layouts/main-footer/main-footer.module';
import { MainSidebarModule } from './layouts/main-sidebar/main-sidebar.module';
import { NavbarModule } from './layouts/navbar/navbar.module';

const layoutModules = [
  // Common
  BreadcrumbsModule,
  MenuModule,
  MessagesModule,
  NotificationsModule,
  SearchModule,
  // Layouts
  ControlSidebarModule,
  MainFooterModule,
  MainSidebarModule,
  NavbarModule
];

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    RouterModule,
    SharedModule,
    ...layoutModules
  ],
  exports: [
    LayoutComponent,
    ...layoutModules
  ]
})
export class LayoutModule { }
