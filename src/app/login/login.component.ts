import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../providers/account.service';
import {Router} from '@angular/router';
import {register} from "ts-node/dist";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // githubUrl: string = 'https://github.com/login/oauth/authorize?client_id=' + gatekeeperConfig.development.client_id + '&scope=user&redirect_uri=' + gatekeeperConfig.development.redirect_uri;
  public loginForm: FormGroup;
  public register: FormGroup;
  public registering: boolean;
  private _errors: any;
  public incorrect: boolean;
  public error: boolean;
  public notInCommunity: boolean;

  constructor(private _formBuilder: FormBuilder, private _accountService: AccountService, private _router: Router) {
    this.incorrect = false;
    this.notInCommunity = false;
    this.error = false;
    this._errors = {};
    this.registering = false;

    this.loginForm = this._formBuilder.group({
      handle: [''],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.register = this._formBuilder.group({
      registerHandle: [''],
      registerPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      // verification: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() {
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
      this.notInCommunity = false;

      this._accountService.login(this.loginForm.getRawValue().handle, this.loginForm.getRawValue().password).subscribe((result) => {
        this._router.navigate(['/prestige-feed'])
      }, (error) => {
        if (error.json().message === 'Authentication Failed: Cannot pass null or empty values to constructor') {
          this.notInCommunity = true;
        } else if (error.json().message === 'Authentication Failed: Bad credentials') {
          this.incorrect = true;
        } else if (error.status === 0) {
          this.error = true;
        }
      });
    } else {
      this.loginForm.reset();
    }
  }

  doRegister() {
    if (this.register.valid) {
      this.notInCommunity = false;
      this.incorrect = false;
      this.error = false;

      this._accountService.register(this.register.getRawValue().registerHandle, this.register.getRawValue().registerPassword).subscribe((result) => {
        this.registering = false;
      }, (error) => {
        if (error.status === 0) {
          this.error = true;
        }
      });
    } else {
      this.register.reset();
    }
    console.log('dit moet registreren');
  }

  get errors(): any {
    return this._errors;
  }
}
