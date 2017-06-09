import {environment} from '../../environments/environment';
import {BaseHttpClient} from './base-http-client.service';
import {Router} from '@angular/router';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {EmployeeService} from './employee.service';
import {Account} from '../models/account';
import {UserService} from './user.service';

@Injectable()
export class AuthService extends BaseHttpClient {

  private loginEndPoint = `${environment.endPoint}/employees-service/login`;

  constructor(protected http: Http,
              protected userService: UserService,
              private router: Router,
              private employeeService: EmployeeService) {
    super(http, userService);
  }

  login(username: string, password: string) {
    return this
      .post(this.loginEndPoint, {username, password}, true)
      .map((response: Response) => {
        return response.text();
      })
      .map((token: string) => {
        this.userService.saveCurrentUserToken(token);
      })
      .mergeMap(() => this.employeeService.getByUsername(username))
      .map((account: Account) => {
        this.userService.saveCurrentUser(account);
      })
      .catch((err) => {
        return Observable.throw(err);
      });
  }

  register(username: string, password: string) {
    return this.http.post(environment.apiRegisterEndpoint + '?username=' + username + '&password=' + password, '')
      .map(result => result)
      .catch((err) => {
        return Observable.throw(err);
      });
  }

  public logout() {
    this.userService.removeCurrentUserData();
    return this.router.navigate(['/login']);
  }

}
