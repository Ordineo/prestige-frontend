import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { gatekeeperConfig } from '../node.config';
import { EmployeeService } from './employee.service';
import { CookieService } from 'ngx-cookie';
import { Account } from '../models/account';

@Injectable()
export class AuthService {

  private _loggedInUser: Account;

  constructor(private http: Http,
    private router: Router,
    private cookieService: CookieService,
    private employeeService: EmployeeService) {
  }

  public getProfile() {
    return this.employeeService
      .getByUsername(this.cookieService.get('username'))
      .map((user: Account) => {
        this._loggedInUser = user;
        return this._loggedInUser;
      })
      .catch(this.handleError);
  }

  public logout() {
    this.cookieService.remove('jwt');
    this.cookieService.remove('username');
    return this.router.navigate(['/login']);
  }

  private handleError(error: Response): Observable<any> {
    return Observable.throw(error || 'Server error');
  }

  get userLoggedIn(): boolean {
    return this.cookieService.get('jwt') !== undefined;
  }

  get loggedInUser(): Account {
    return this._loggedInUser;
  }

}
