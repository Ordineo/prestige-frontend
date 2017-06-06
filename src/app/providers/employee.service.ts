import { Injectable, Inject } from '@angular/core';
import { share } from 'rxjs/operator/share';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { Account } from '../models/account';

@Injectable()
export class EmployeeService {

  constructor(private http: Http) {
  }

  getEmployees() {
    // return this.af.database.object('/employees/')
    //   .map(result => (result))
  }

  getTestData() {
    // return this.af.database.list('/test/')
    //   .map(result => (result))
  }

  getEmployeeById(id: number) {
    // return this.af.database.object('/employees/' + id)
    //   .map(result => (result))
  }

  get() {
    return this.http.get(environment.apiUsersEndpoint)
      .map(result => {
        return result.json()._embedded;
      });
  }

  getByUsername(username: string): Observable<Account> {
    return this.http
      .get(environment.apiUsersEndpoint + '/' + username)
      .map(result => result.json());

  }

}
