import { NgModule } from '@angular/core';
import { AuthUnlockSessionComponent } from './unlock-session.component';
import { RouterModule } from '@angular/router';
import { authUnlockSessionRoutes } from './unlock-session.routing';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [
    AuthUnlockSessionComponent
  ],
  imports: [
    RouterModule.forChild(authUnlockSessionRoutes),
    SharedModule
  ]
})
export class AuthUnlockSessionModule { }
