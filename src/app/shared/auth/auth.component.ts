import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {gatekeeperConfig} from "../../node.config";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {AuthService} from "../../providers/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: Http,
              private authService: AuthService) {
  }

  accessToken: any;
  
  public getToken(code) {
    this.accessToken = this.http.get(gatekeeperConfig.development.gatekeeper + '/authenticate/' + code)
      .map((res: Response) => {
        let json = res.json();
        console.log("JSON: ", json);
        if (json && json.token) {
          console.log("GOOD");
          this.accessToken = json;
          localStorage.setItem("access_token", this.accessToken.token);
          return {"authenticated": true};
        } else {
          console.log("BAD");
          localStorage.removeItem("access_token");
          return {"authenticated": false};
        }
      })
      .catch(this.handleError); //...errors if any

    return this.accessToken;
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (param: any) => {
        let code = param['code'];
        console.log("get gitHub code: ", code);
        this.getToken(code).subscribe(() => {
          return this.router.navigate(['/prestige-feed']);
        });
      })
  }

}
