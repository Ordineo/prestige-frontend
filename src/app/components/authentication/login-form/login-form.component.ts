import { AuthService } from '../../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @ViewChild('loginForm') loginForm: NgForm;
  public loginModel: { handle: string, password: string };
  public notInCommunity = false;
  public error: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.loginModel = { handle: undefined, password: undefined };
  }

  ngOnInit() {
  }

  public login() {
    this.error = false;

    if (this.loginForm.valid) {
      this.notInCommunity = false;

      this.authService
        .login(this.loginModel.handle, this.loginModel.password)
        .subscribe(
        () => {
          this.router.navigate(['/endorsement-feed'])
        }, (error) => {
          if (error.json().message === 'Authentication Failed: Cannot pass null or empty values to constructor') {
            this.notInCommunity = true;
          } else if (error.status === 0 || error.json().message === 'Authentication Failed: Bad credentials') {
            this.error = true;
          }
        });
    }
  }
}
