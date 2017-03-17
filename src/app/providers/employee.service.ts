import {Injectable, Inject} from '@angular/core';
import {AngularFire} from  'angularfire2';
import {share} from "rxjs/operator/share";
import {Http} from "@angular/http";
import {APP_CONFIG, IAppConfig} from "../app.config";


@Injectable()
export class EmployeeService {

  constructor(private af: AngularFire, private http: Http, @Inject(APP_CONFIG) private config) {
  }

  getEmployees() {
    return this.af.database.object('/employees/')
      .map(result => (result))
  }

  getTestData() {
    return this.af.database.list('/test/')
      .map(result => (result))
  }

  getEmployeeById(id: number) {
    return this.af.database.object('/employees/' + id)
      .map(result => (result))
  }

  get() {
    return this.http.get(this.config.apiUsersEndpoint)
      .map(result => {
        return result.json()._embedded;
      });
  }

  getById(id: number) {
    return this.http.get(this.config.apiUsersEndpoint + '/search/findById?id=' + id)
      .map(result => (result.json()._embedded));
  }

}
