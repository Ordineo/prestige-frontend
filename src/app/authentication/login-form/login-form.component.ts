import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AccountService } from '../../providers/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  // githubUrl: string = 'https://github.com/login/oauth/authorize?client_id=' + gatekeeperConfig.development.client_id + '&scope=user&redirect_uri=' + gatekeeperConfig.development.redirect_uri;

  @ViewChild('loginForm') loginForm: NgForm;
  public loginModel: { handle: string, password: string };
  public notInCommunity = false;
  public error: boolean;

  constructor(private accountService: AccountService, private router: Router) {
    this.loginModel = { handle: undefined, password: undefined };
  }

  ngOnInit() {
  }

  public login() {
    this.error = false;

    if (this.loginForm.valid) {
      this.notInCommunity = false;

      this.accountService
        .login(this.loginModel.handle, this.loginModel.password)
        .subscribe((result) => {
          this.router.navigate(['/prestige-feed'])
        }, (error) => {
          if (error.json().message === 'Authentication Failed: Cannot pass null or empty values to constructor') {
            this.notInCommunity = true;
          } else if (error.json().message === 'Authentication Failed: Bad credentials') {
            this.error = true;
          } else if (error.status === 0) {
            this.error = true;
          }
        });
    } else {
      this.loginForm.reset();
    }
  }
}
