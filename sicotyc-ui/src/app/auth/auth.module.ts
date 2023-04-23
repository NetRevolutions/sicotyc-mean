import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthConfirmationRequiredComponent } from './confirmation-required/confirmation-required.component';
import { AuthForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthSignInComponent } from './sign-in/sign-in.component';
import { AuthSignUpComponent } from './sign-up/sign-up.component';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [
    AuthConfirmationRequiredComponent,
    AuthForgotPasswordComponent,
    AuthResetPasswordComponent,
    AuthSignInComponent,
    AuthSignUpComponent
  ],
  exports: [
    AuthConfirmationRequiredComponent,
    AuthForgotPasswordComponent,
    AuthResetPasswordComponent,
    AuthSignInComponent,
    AuthSignUpComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AuthPagesModule { }
