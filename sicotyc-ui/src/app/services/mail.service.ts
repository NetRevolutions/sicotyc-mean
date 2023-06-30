import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegisterForm } from 'app/interfaces/register-form.interface';
import { environment } from 'environments/environment.development';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser( formData: IRegisterForm) {
    return this.http.post(`${ base_url }/mail/registerUser`, formData);
  }
}
