import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { IRegisterCompany } from 'app/interfaces/register-company.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor( private http: HttpClient) { }  

  getCompanyById (id: string ) {
    return this.http.get(`${ base_url }/companies/${ id }`);
  }

  getCompanyByRuc( ruc: string ) {
    return this.http.get(`${base_url}/companies/ruc/${ruc}`);
  }

  createCompany( formData: IRegisterCompany ) {
    return this.http.post(`${base_url}/companies`, formData);
  }
}
