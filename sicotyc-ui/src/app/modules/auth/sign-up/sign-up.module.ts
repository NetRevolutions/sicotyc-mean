import { NgModule } from '@angular/core';
import { AuthSignUpComponent } from './sign-up.component';
import { RouterModule } from '@angular/router';
import { authSignUpRoutes } from './sign-up.routing';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [
    AuthSignUpComponent
  ],
  imports: [
    RouterModule.forChild(authSignUpRoutes),
    SharedModule
  ]
})
export class AuthSignUpModule { }
