import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataHelper } from 'app/helpers/data-helper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal  from 'sweetalert2';

import { enumLookupCodeGroup } from 'app/enum/lookupCodeGroups.enum';

// Interfaces
import { IReturnLookupCodes } from 'app/interfaces/lookup.interface';
import { IUserCompany } from 'app/interfaces/user-company.interface';

// Models
import { User } from 'app/models/user.model';
import { Company } from 'app/models/company.models';

// Services
import { RoleService } from 'app/services/role.service';
import { UserService } from 'app/services/user.service';
import { CompanyService } from 'app/services/company.service';
import { LookupService } from 'app/services/lookup.service';
import { MailService } from 'app/services/mail.service';
import { FileUploadService } from 'app/services/file-upload.service';
import { switchAll } from 'rxjs';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: [
  ],
  exportAs: 'app-user-profile'
})
export class UserProfileComponent implements OnInit {

  public rolesString: string = '';  
  public lcItems: [IReturnLookupCodes];
  public profileForm: FormGroup;
  public user: User;  
  public company: Company;
  public uploadImage: File;
  public imgTemp: any = '';

  public formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private companyService: CompanyService,
    private lookupService: LookupService,
    private mailService: MailService,
    private router: Router,
    private fileUploadService: FileUploadService    
  ) {    
      this.user = userService.user;      
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
    });
    
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],          
      companyRuc: ['', [Validators.required]],
      companyComercialName: ['', [Validators.required]],
      companyEmail: ['', [Validators.required]],
      companyPhone: ['', [Validators.required]],
      companyType: ['', [Validators.required]]
    });
    
    this.userService.getUserCompany()
    .subscribe((userCompanyData: any) => {      
      if (userCompanyData.ok) {
        this.companyService.getCompanyById(userCompanyData.userCompany.company)
        .subscribe( (companyData: any) => {
          if (companyData.ok)
          this.company = companyData.company;               
          this.setValues();
          this.getRoles();
          this.disableControls();    
        });
      }
    });
  };

  updateProfile() {
    this.formSubmitted = true;

    if (this.profileForm.invalid) {
      return;
    }

    //console.log(this.profileForm.value);
    // return; // <== used for tests

    this.userService.updateUserProfile( this.profileForm.value )
    .subscribe( (usr: any) => {
      this.formSubmitted = false;
      if (usr.ok) {        
        Swal.fire('Exito!', 
                  'Los datos del usuario fueron actualizados correctamente', 
                  'success');
      }
      else {
        Swal.fire('ups!!',
                  'ocurrio un problema al actualizar los datos, contacte al administrador',
                  'error');
      }      
    }, (err) => {
      this.formSubmitted = false;
      Swal.fire('Error', 
                err.error.msg, 
                'error');
    });
  };  
  
  setValues() {
    // User
    this.user ? this.profileForm.controls['firstName'].setValue(this.user.firstName) : this.profileForm.controls['firstName'].setValue('');
    this.user ? this.profileForm.controls['lastName'].setValue(this.user.lastName) : this.profileForm.controls['lastName'].setValue('');
    this.user ? this.profileForm.controls['userName'].setValue(this.user.userName) : this.profileForm.controls['userName'].setValue('');
    this.user ? this.profileForm.controls['mobile'].setValue(this.user.mobile) : this.profileForm.controls['mobile'].setValue('');
    this.user ? this.profileForm.controls['email'].setValue(this.user.email) : this.profileForm.controls['email'].setValue('');

    // Company
    this.company ? this.profileForm.controls['companyRuc'].setValue(this.company.ruc) : this.profileForm.controls['companyRuc'].setValue('');
    this.company ? this.profileForm.controls['companyComercialName'].setValue(this.company.nombreComercial) : this.profileForm.controls['companyComercialName'].setValue('');
    this.company ? this.profileForm.controls['companyEmail'].setValue(this.company.companyEmail) : this.profileForm.controls['companyEmail'].setValue('');
    this.company ? this.profileForm.controls['companyPhone'].setValue(this.company.companyPhone) : this.profileForm.controls['companyPhone'].setValue('');
    this.company ? this.profileForm.controls['companyType'].setValue(this.company.typeOfCompany) : this.profileForm.controls['companyType'].setValue('');
  };
  
  getRoles() {
    this.roleService.getRoles()
    .subscribe((rolesData:any) =>{
      if (rolesData.ok) {
        if (rolesData.roles.length > 0) {
          // Obtenemos los roles del usuario
          this.userService.getUserRoles()
          .subscribe((userRolesData: any) => {
            if (userRolesData.ok) {              
              // Filtramos los roles que coinciden con el Id
              let tempRoles = rolesData.roles.filter((el) => {
                return userRolesData.roles.some((f) => {
                  return f === el._id
                });
              });
              let arrayRoles = [];
              tempRoles.forEach((element) => {
                arrayRoles.push(element.roleName);          
              });
              this.rolesString = new DataHelper().convertArrayToChainString(arrayRoles);
            }
          });          
        }
      }            
    })
  };

  disableControls() {
    this.profileForm.controls['companyType'].disable();
  };

  fieldNoValidate(field: string): boolean {
    if ( this.profileForm.get( field ).invalid && this.formSubmitted ) {
      return true; // Campo no es valido.
    } else {
      return false;
    }
  };

  changeImage( file: File ) {
    this.uploadImage = file;

    if( !file ) { return this.imgTemp = null; }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  };

  loadImage() {
    this.fileUploadService
    .updatePhoto(this.uploadImage, 'users', this.user.uid)
    .then( img => {
      this.user.imagePath = img
      Swal.fire('Exito!!!', 'Imagen actualizada con exito!', 'success');  
    }).catch( err => {
      console.log(err);
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    });
  };
}
