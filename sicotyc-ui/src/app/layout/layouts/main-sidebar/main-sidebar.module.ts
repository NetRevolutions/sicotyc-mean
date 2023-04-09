import { NgModule } from '@angular/core';
import { MainSidebarComponent } from './main-sidebar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MenuModule } from 'app/layout/common/menu/menu.module';



@NgModule({
  declarations: [
    MainSidebarComponent
  ],
  imports: [
    RouterModule.forChild([]),
    SharedModule,
    MenuModule
  ],
  exports: [
    MainSidebarComponent
  ]
})
export class MainSidebarModule { }
