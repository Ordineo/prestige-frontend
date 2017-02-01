import {Injectable} from '@angular/core';
import {AngularFire} from  'angularfire2';
import {share} from "rxjs/operator/share";


@Injectable()
export class EmployeeService {

  constructor(private af: AngularFire) {
  }

  getEmployees() {
    return this.af.database.object('/employees/')
      .map(result => (result))
      .do(result => (result));
  }

  getEmployeeById(id: number) {
    return this.af.database.object('/employees/' + id)
      .map(result => (result))
      .share();
  }

}
