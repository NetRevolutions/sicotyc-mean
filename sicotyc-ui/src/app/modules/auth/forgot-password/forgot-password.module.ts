import { NgModule } from '@angular/core';
import { AuthForgotPasswordComponent } from './forgot-password.component';
import { RouterModule } from '@angular/router';
import { authForgotPasswordRoutes } from './forgot-password.routing';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [
    AuthForgotPasswordComponent
  ],
  imports: [
    RouterModule.forChild(authForgotPasswordRoutes),
    SharedModule
  ]
})
export class AuthForgotPasswordModule { }
