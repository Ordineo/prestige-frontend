import {environment} from '../../environments/environment';
import {PrestigeHttp} from './prestige-http.service';
import {Router} from '@angular/router';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {EmployeeService} from './employee.service';
import {Account} from '../models/account';
import {UserService} from './user.service';

@Injectable()
export class AuthService {

  private loginEndPoint = `${environment.endPoint}/employees-service/login`;
  private registerEndpoint = `${environment.endPoint}/employees-service/register`;

  constructor(protected http: PrestigeHttp,
              protected userService: UserService,
              private router: Router,
              private employeeService: EmployeeService) {
  }

  login(username: string, password: string) {
    return this.http
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
    return this.http
      .post(`${this.registerEndpoint}?username=${username}&password=${password}`, null, false)
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
