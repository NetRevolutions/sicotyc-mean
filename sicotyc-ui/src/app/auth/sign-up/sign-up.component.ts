import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal  from 'sweetalert2';

// Enums
import { enumLookupCodeGroup } from 'app/enum/lookupCodeGroups.enum';

// Interfaces
import { IReturnLookupCodes } from 'app/interfaces/lookup.interface';
import { IRegisterCompany } from 'app/interfaces/register-company.interface';

// Services
import { CompanyService } from 'app/services/company.service';
import { LookupService } from 'app/services/lookup.service';
import { UserService } from 'app/services/user.service';
import { MailService } from 'app/services/mail.service';


@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./sign-up.component.css']
})
export class AuthSignUpComponent implements OnInit {

  public formSubmitted = false;
  public lcItems: [IReturnLookupCodes];

  public registerForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required]],
    userName: ['', [Validators.required]],
    mobile: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]],
    companyRuc: ['', [Validators.required]],
    companyComercialName: ['', [Validators.required]],
    companyEmail: ['', [Validators.required]],
    companyPhone: ['', [Validators.required]],
    companyType: ['', [Validators.required]],
    terms: [ false, [Validators.required]]
  }, {
    validators: this.passwordsEquals('password', 'password2')
  });

  /**
   * Constructor
   */
  constructor(
    private fb: FormBuilder ,
    private userService: UserService,
    private companyService: CompanyService,
    private lookupService: LookupService,
    private mailService: MailService,
    private router: Router)
  {
  }
  

  ngOnInit(): void {
    this.lookupService.getLookupCodesByLookupCodeGroupName(enumLookupCodeGroup.TIPO_EMPRESA)
    .then((results: [IReturnLookupCodes]) => {
      this.lcItems = results;

      this.lcItems.unshift({
        lcgId: '',
        lcgName: '',
        lcId: '',
        lcName: '-- Tipo de Empresa --',
        lcValue: '',
        lcOrder: 0
      });      
      
    })
  }

  createUser() {
    this.formSubmitted = true;
    //console.log(this.registerForm.value );    
    
    if ( this.registerForm.invalid ) {
      return;
    } 

    //return; // <== used for tests

    // Realizar el posteo
    this.userService.createUser( this.registerForm.value )
    .subscribe( (usr: any) => {     
      
      // Registrar empresa
      let companyEntity = {} as IRegisterCompany;
      companyEntity.ruc = this.registerForm.value['companyRuc'];
      companyEntity.nombreComercial = this.registerForm.value['companyComercialName'];
      companyEntity.companyEmail = this.registerForm.value['companyEmail'];
      companyEntity.companyPhone = this.registerForm.value['companyPhone'];
      companyEntity.typeOfCompany_id = this.registerForm.value['companyType'];

      this.companyService.getCompanyByRuc(companyEntity.ruc)
      .subscribe( (comp: any) => {
        if (!comp.ok) {
          // Register Company
          this.companyService.createCompany( companyEntity )
          .subscribe( (comp2: any) => {               

            // Register UserCompany
            this.userService.createUserCompany( usr.user.uid, comp2.company._id )
            .subscribe((usrComp: any) => {              
              this.formSubmitted = false;
              // Seteo de token
              localStorage.setItem('token', usr.token);

              // Envio de correo
              this.mailService.registerUser( this.registerForm.value )
              .subscribe((resp: any) => {
                if (resp.ok) {
                  Swal.fire('Registro exitoso', 
                  resp.msg, 
                  'success')
                  .then(() => {
                    this.router.navigateByUrl('/sign-in');
                  });
                }
                else {
                  Swal.fire('ups!!',
                  'ocurrio un problema durante el envio de correo, contacte al administrador',
                  'error');
                }                
              });
              
            });
          }, (err) => {
            //console.warn(err.error.msg)
            Swal.fire('Error', err.error.msg, 'error');
          }
          );
        }
        else {
          // Register UserCompany
          this.userService.createUserCompany( usr.user.uid, comp.company._id )
            .subscribe((usrComp: any) => {              
              this.formSubmitted = false;
              // Seteo de token
              localStorage.setItem('token', usr.token);

              // Envio de correo
              this.mailService.registerUser( this.registerForm.value )
              .subscribe((resp: any) => {
                if (resp.ok) {
                  Swal.fire('Registro exitoso', 
                  resp.msg, 
                  'success')
                  .then(() => {
                    this.router.navigateByUrl('/sign-in');
                  });
                }
                else {
                  Swal.fire('ups!!',
                  'ocurrio un problema durante el envio de correo, contacte al administrador',
                  'error');
                }                
              });
            });
        }
      }, (err) => {
        //console.warn( err.error.msg )
        Swal.fire('Error', err.error.msg, 'error');
      }
      );    
    }, (err) => {
      // console.warn( err.error.msg )
      Swal.fire('Error', err.error.msg, 'error');
    }
    );
  }

  fieldNoValidate(field: string): boolean {
    if ( this.registerForm.get( field ).invalid && this.formSubmitted ) {
      return true; // Campo no es valido.
    } else {
      return false;
    }
  }

  passwordsNotValid() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  accepTerms() {
    return !this.registerForm.get('terms').value && this.formSubmitted
  }

  passwordsEquals(pass1Name: string, pass2Name: string) {
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEqual: true });
      }
    }
  }  
}
