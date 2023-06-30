import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from 'rxjs';
/* El tap le da como un paso mas a la respuesta que recibimos, 
 * contiene toda la respuesta y permite hacer algun trabajo adicional
 * sin afectar el resultado inicial  
*/

import { environment } from 'environments/environment.development';

// Models
import { User } from 'app/models/user.model';

// Interfaces
import { ILoginForm } from 'app/interfaces/login-form.interface';
import { IRegisterForm } from 'app/interfaces/register-form.interface';
import { IUserCompany } from 'app/interfaces/user-company.interface';
import { IUpdateUserProfile } from 'app/interfaces/user-profile.interface';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;  

  constructor( 
    private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  validateToken(): Observable<boolean> {    

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {        
        const { email, firstName, imagePath = '', lastName, uid, userName, mobile = '' } = resp.user;        

        this.user = new User(firstName, lastName, email, userName, mobile, '', imagePath, [], uid);
          
        localStorage.setItem('token', resp.token);
        return true;
      }),      
      catchError( error => of(false) )
    );
  }  

  createUser( formData: IRegisterForm ) {
    return this.http.post(`${ base_url }/users`, formData);
  }

  createUserCompany( user: string, company: string ) {
    return this.http.post(`${ base_url }/userCompany`, { user, company });
    // Nota: En este medoto el token lo estoy seteando en el localstorage en los metodos mas arriba porque hacen otras tareas.

  }

  updateUserProfile( formData: IUpdateUserProfile) {
    return this.http.put(`${ base_url }/users/${ this.uid}`, formData, {
      headers:  {
        'x-token' : this.token
      }
    });    
  }

  login( formData: ILoginForm ) {
    return this.http.post(`${ base_url }/login`, formData )
                .pipe(
                  tap( (resp: any) => { 
                    localStorage.setItem( 'token', resp.token );
                  })
                );
  }

  logout () {
    localStorage.removeItem('token');    
  }

  getUserCompany() {    
    return this.http.get(`${ base_url }/userCompany/${ this.uid }`);
  }

  getUserRoles() {
    return this.http.get(`${ base_url }/userRoles/${ this.uid }`);
  }
}
