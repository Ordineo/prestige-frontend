import {Component, OnInit} from '@angular/core';
import {gatekeeperConfig} from "../node.config";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../providers/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //githubUrl: string = 'https://github.com/login/oauth/authorize?client_id=' + gatekeeperConfig.development.client_id + '&scope=user&redirect_uri=' + gatekeeperConfig.development.redirect_uri;
  private loginForm: FormGroup;
  private register: FormGroup;
  private _errors: any;
  private incorrect: boolean = true;
  private notInCommunity: boolean = true;

  constructor(private _formBuilder: FormBuilder, private _accountService: AccountService, private _router: Router) {
    this._errors = {};

    this.loginForm = this._formBuilder.group({
      handle: [''],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.register = this._formBuilder.group({
      handle: [''],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      verification: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() {
  }

  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  emailCheck(value: string) {
    if (value.indexOf('@') > -1) {
      this._errors.email = '';
      if (value.length < 6) {
        this._errors.email = 'Email should have at least 6 characters!';
      } else if (!this.validateEmail(value)) {
        this._errors.email = 'Email is invalid!';
      }
    }
  }

  login() {
    if (this.loginForm.valid) {
      this._accountService.login(this.loginForm.getRawValue().handle, this.loginForm.getRawValue().password).subscribe((result) => {
        console.log(result);
      });
      // this._router.navigate(['/prestige-feed'])
    } else {
      this.loginForm.reset();
      console.log("form error");
    }
  }

  get errors(): any {
    return this._errors;
  }
}
