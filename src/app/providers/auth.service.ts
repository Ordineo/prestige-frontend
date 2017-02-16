import {ActivatedRoute, Router} from "@angular/router";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {gatekeeperConfig} from "../node.config";

@Injectable()
export class AuthService {

  constructor(private http: Http,
              private router: Router) {
  }

  public getProfile() {
      let headers = new Headers({'Authorization': 'token ' + localStorage.getItem("access_token")}); // ... Set content type to JSON
      let options = new RequestOptions({headers: headers}); // Create a request option

      return this.http.get("https://api.github.com/user", options)
        .map((res: Response) => {
          return res.json()
        })
        .catch(this.handleError);
  }

  public logout() {
    localStorage.removeItem('access_token');
    return this.router.navigate(['login']);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  ngOnInit() {
  }

}
