import {Component, OnInit} from '@angular/core';
import {gatekeeperConfig} from "../node.config";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../providers/account.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //githubUrl: string = 'https://github.com/login/oauth/authorize?client_id=' + gatekeeperConfig.development.client_id + '&scope=user&redirect_uri=' + gatekeeperConfig.development.redirect_uri;
  private loginForm: FormGroup;
  private register: FormGroup;
  private errors: any;
  private incorrect: boolean = true;
  private notInCommunity: boolean = true;

  constructor(private _formBuilder: FormBuilder, private _accountService: AccountService) {
    this.errors = {};

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
      this.errors.email = '';
      if (value.length < 6) {
        this.errors.email = 'Email should have at least 5 characters!';
      } else if (!this.validateEmail(value)) {
        this.errors.email = 'Email is invalid!';
      }
    }
  }

  login() {
    if (this.loginForm.valid) {
      this._accountService.login(this.loginForm.getRawValue().handle, this.loginForm.getRawValue().password);
      this.loginForm.reset();
    } else {
      console.log("form error");
    }
  }
}
