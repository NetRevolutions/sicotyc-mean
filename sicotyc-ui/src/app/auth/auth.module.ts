import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Modules
import { SharedModule } from 'app/shared/shared.module';

// Components
import { AuthConfirmationRequiredComponent } from './confirmation-required/confirmation-required.component';
import { AuthForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthSignInComponent } from './sign-in/sign-in.component';
import { AuthSignUpComponent } from './sign-up/sign-up.component';
import { AuthUnlockSessionComponent } from './unlock-session/unlock-session.component';
import { AuthSignOutComponent } from './sign-out/sign-out.component';



@NgModule({
  declarations: [
    AuthConfirmationRequiredComponent,
    AuthForgotPasswordComponent,
    AuthResetPasswordComponent,
    AuthSignInComponent,
    AuthSignOutComponent,
    AuthSignUpComponent,
    AuthUnlockSessionComponent
  ],
  exports: [
    AuthConfirmationRequiredComponent,
    AuthForgotPasswordComponent,
    AuthResetPasswordComponent,
    AuthSignInComponent,
    AuthSignOutComponent,
    AuthSignUpComponent,
    AuthUnlockSessionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ]
})
export class AuthModule { }
