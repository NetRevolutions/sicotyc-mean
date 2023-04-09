import { NgModule } from '@angular/core';
import { MainFooterComponent } from './main-footer.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [
    MainFooterComponent
  ],
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [
    MainFooterComponent
  ]
})
export class MainFooterModule { }
