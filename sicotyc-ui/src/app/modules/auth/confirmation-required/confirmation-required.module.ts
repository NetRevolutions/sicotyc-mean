import { NgModule } from '@angular/core';
import { AuthConfirmationRequiredComponent } from './confirmation-required.component';
import { RouterModule } from '@angular/router';
import { authConfirmationRequiredRoutes } from './confirmation-required.routing';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [
    AuthConfirmationRequiredComponent
  ],
  imports: [
    RouterModule.forChild(authConfirmationRequiredRoutes),
    SharedModule
  ]
})
export class AuthConfirmationRequiredModule 
{
}
