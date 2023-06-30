import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

// Services
import { UserService } from 'app/services/user.service';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {     

      return this.userService.validateToken()
        .pipe(
          tap( isAuthenticated => {
            if (!isAuthenticated) {
              this.router.navigateByUrl('/sign-in');
            }
          }),
          catchError( error => {
            console.log(error);
            return of(error)
          })
        );
  }
  
}
