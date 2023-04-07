import { NgModule } from '@angular/core';
import { AuthSignOutComponent } from './sign-out.component';
import { RouterModule } from '@angular/router';
import { authSignOutRoutes } from './sign-out.routing';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [
    AuthSignOutComponent
  ],
  imports: [
    RouterModule.forChild(authSignOutRoutes),
    SharedModule
  ]
})
export class AuthSignOutModule { }
