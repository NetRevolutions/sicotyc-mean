import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/models/user.model';

import { UserService } from 'app/services/user.service';

@Component({
  selector: 'user-options',
  templateUrl: './user-options.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'user-options'
})
export class UserOptionsComponent {

  public user: User;  

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.user = userService.user;  
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/sign-in');
  }
}
