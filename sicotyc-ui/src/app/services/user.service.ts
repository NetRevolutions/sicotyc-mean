import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from 'app/interfaces/register-form.interface';
import { environment } from 'environments/environment.development';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) { }

  createUser( formData: RegisterForm ) {
    return this.http.post(`${ base_url }/users`, formData);
  }

  createUserCompany( user: string, company: string ) {
    return this.http.post(`${ base_url }/userCompany`, { user, company });
  }
}
