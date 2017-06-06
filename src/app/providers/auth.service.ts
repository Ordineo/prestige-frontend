import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { gatekeeperConfig } from '../node.config';
import { EmployeeService } from './employee.service';

@Injectable()
export class AuthService {
  private _loggedInUser: any;
  private _userLoggedIn: boolean;

  constructor(private http: Http,
    private router: Router,
    private employeeService: EmployeeService) {
  }

  public getProfile() {
    // let headers = new Headers({'Authorization': sessionStorage.getItem("Authorization")}); // ... Set content type to JSON
    // let options = new RequestOptions({headers: headers}); // Create a request option

    return this.employeeService.getByUsername(sessionStorage.getItem('username'))
      .map((res: Response) => {
        this._loggedInUser = res;
        this._userLoggedIn = true;
        return this._loggedInUser;
      })
      .catch(this.handleError);

    // return this.http.get("https://api.github.com/user", options)
    //   .map((res: Response) => {
    //     this._loggedInUser = res.json();
    //     this._userLoggedIn = true;
    //     return this._loggedInUser;
    //   })
    //   .catch(this.handleError);
  }

  public logout() {
    this._userLoggedIn = false;
    sessionStorage.removeItem('Authorization');
    return this.router.navigate(['/login']);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }

  ngOnInit() {
  }

  get loggedInUser(): any {
    return this._loggedInUser;
  }

  get userLoggedIn() {
    return this._userLoggedIn;
  }

}
