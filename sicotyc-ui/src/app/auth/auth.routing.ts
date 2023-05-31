import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AuthConfirmationRequiredComponent } from './confirmation-required/confirmation-required.component';
import { AuthForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthSignInComponent } from './sign-in/sign-in.component';
import { AuthSignUpComponent } from './sign-up/sign-up.component';
import { AuthSignOutComponent } from './sign-out/sign-out.component';
import { AuthUnlockSessionComponent } from './unlock-session/unlock-session.component';

const routes: Routes = [
    //canMatch: [NoAuthGuard], //TODO: Pending implement
    { path    : 'confirmation-required', component: AuthConfirmationRequiredComponent},
    { path    : 'forgot-password', component: AuthForgotPasswordComponent},
    { path    : 'reset-password', component: AuthResetPasswordComponent},
    { path    : 'sign-in', component: AuthSignInComponent},
    { path    : 'sign-out', component: AuthSignOutComponent},
    { path    : 'sign-up', component: AuthSignUpComponent},
    { path    : 'unlock-session', component: AuthUnlockSessionComponent}
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule]
})
export class AuthRoutingModule {}
