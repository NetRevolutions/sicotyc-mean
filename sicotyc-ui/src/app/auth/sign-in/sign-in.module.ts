import { NgModule } from '@angular/core';
import { AuthSignInComponent } from './sign-in.component';
import { RouterModule } from '@angular/router';
import { authSignInRoutes } from './sign-in.routing';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [
    AuthSignInComponent
  ],
  imports: [
    RouterModule.forChild(authSignInRoutes),
    SharedModule
  ]
})
export class AuthSignInModule { }
