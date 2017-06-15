import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Account } from '../models/account';
import { PrestigeHttp } from './prestige-http.service';

@Injectable()
export class EmployeeService {

  private apiUsersEndpoint = `${environment.endPoint}/employees-service/employees`;

  constructor(private http: PrestigeHttp) {
  }

  getAllEmployees(): Observable<Account[]> {
    return this.http
      .get(this.apiUsersEndpoint, true)
      .map(result => result.json())
      .map(resJson => resJson._embedded.employees || []);
  }

  getByUsername(username: string): Observable<Account> {
    return this.http
      .get(`${this.apiUsersEndpoint}/${username}`, true)
      .map(result => result.json());
  }

  updateAccount(account: Account) {
    return this.http
      .put(`${this.apiUsersEndpoint}/${account.username}`, account, true);
  }
}
