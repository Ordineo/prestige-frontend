import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie';
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Account } from '../models/account';
import { BaseHttpClient } from './base-http-client.service';
import { constants } from '../util/constants';

@Injectable()
export class EmployeeService extends BaseHttpClient {

  private apiUsersEndpoint = `${environment.endPoint}/employees-service/employees`;

  getAllEmployees(): Observable<Account[]> {
    return this
      .get(this.apiUsersEndpoint, true)
      .map(result => result.json())
      .map(resJson => resJson._embedded.employees || []);
  }

  getByUsername(username: string): Observable<Account> {
    return this
      .get(`${this.apiUsersEndpoint}/${username}`, true)
      .map(result => result.json());
  }

  updateAccount(account: Account) {
    return this.put(`${this.apiUsersEndpoint}/${account.username}`, account, true);
  }
}
