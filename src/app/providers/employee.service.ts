import {Injectable} from '@angular/core';
import {AngularFire} from  'angularfire2';
import {share} from "rxjs/operator/share";
import {Http} from "@angular/http";


@Injectable()
export class EmployeeService {

  constructor(private af: AngularFire, private http: Http) {
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
    return this.http.get("http://localhost:8585/employee-service/users")
      .map(result => {
        return result.json()._embedded;
      });
  }

}
