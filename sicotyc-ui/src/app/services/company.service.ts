import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { RegisterCompany } from 'app/interfaces/register-company.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor( private http: HttpClient) { }  

  getCompanyByRuc( ruc: string ) {
    return this.http.get(`${base_url}/companies/ruc/${ruc}`)
  }

  createCompany( formData: RegisterCompany ) {
    return this.http.post(`${base_url}/companies`, formData);
  }
}
