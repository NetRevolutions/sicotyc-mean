import {Role} from '@/models/role.models';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    constructor(private http: HttpClient) {}

    getRoles() {
        return this.http.get<Role[]>(`${base_url}/roles`);
    }
}
