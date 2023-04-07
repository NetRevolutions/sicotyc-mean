import { NgModule } from '@angular/core';
import { AuthResetPasswordComponent } from './reset-password.component';
import { RouterModule } from '@angular/router';
import { authResetPasswordRoutes } from './reset-password.routing';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [
    AuthResetPasswordComponent
  ],
  imports: [
    RouterModule.forChild(authResetPasswordRoutes),
    SharedModule
  ]
})
export class AuthResetPasswordModule { }
