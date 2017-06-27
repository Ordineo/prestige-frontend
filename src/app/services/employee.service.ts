import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Account } from '../models/account';
import { PrestigeHttp } from './prestige-http.service';
import { PageInfo } from '../models/pageinfo';
import { Page } from '../models/page';

@Injectable()
export class EmployeeService {

  private apiUsersEndpoint = `${environment.endPoint}/employees-service/employees`;

  constructor(private http: PrestigeHttp) {
  }

  getEmployees(page: number, size: number): Observable<Page<Account>> {
    return this.http
      .get(`${this.apiUsersEndpoint}?page=${page}&size=${size}`, true)
      .map(result => result.json())
      .map(resultJson => Page.createPage<Account>(
        (resultJson._embedded || {}).employees || [],
        resultJson.page ? PageInfo.createPageInfo(resultJson.page) : new PageInfo()));
  }

  searchEmployees(options: { username: string, firstName: string, lastName: string }): Observable<Account[]> {
    return this.http
      .get(`${this.apiUsersEndpoint}?search=username:${options.username},firstName:${options.firstName},lastName:${options.lastName}&page=0&size=5`, true)
      .map((response: Response) => response.json())
      .map(responseJson => responseJson._embedded && responseJson._embedded.employees ? responseJson._embedded.employees : []);
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
