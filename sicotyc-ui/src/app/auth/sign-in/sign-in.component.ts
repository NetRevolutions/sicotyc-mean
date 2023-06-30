import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// Services
import { UserService } from 'app/services/user.service';



@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'auth-sign-in'
})
export class AuthSignInComponent {

  public formSubmitted = false;

  /**
   * Constructor
   */
  constructor( 
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  )
  {
  }  

  public loginForm = this.fb.group({    
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]   
  });
  
  
  login() {
    this.formSubmitted = true;

    if ( this.loginForm.invalid ) {
      return;
    }

    this.userService.login( { 
                              email: this.loginForm.value['email'], 
                              password: this.loginForm.value['password'], 
                              remember: this.loginForm.value['remember']} 
                              )
    .subscribe( resp => {
      if ( this.loginForm.get('remember').value ) {
        localStorage.setItem('email', this.loginForm.get('email').value );
      }
      else {
        localStorage.removeItem('email');
      }

      this.router.navigateByUrl('/');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });    
  }



  fieldNoValidate(field: string): boolean {
    if ( this.loginForm.get( field ).invalid && this.formSubmitted ) {
      return true; // Campo no es valido.
    } else {
      return false;
    }
  }
}
