import { AuthService } from '../../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @ViewChild('loginForm') loginForm: NgForm;
  public loginModel: { handle: string, password: string };
  public error: string;

  constructor(private authService: AuthService, private router: Router) {
    this.loginModel = {handle: undefined, password: undefined};
  }

  ngOnInit() {
  }

  public login() {

    if (this.loginForm.valid) {
      this.error = null;

      this.authService
        .login(this.loginModel.handle, this.loginModel.password)
        .subscribe(
          () => {
            this.router.navigate(['/endorsement-feed']);
          }, (error: Response) => {
            if (error.status === 0) {
              this.error = 'No connection could be made to the backend.';
            } else if (error.status === 401) {
              this.error = 'There was something wrong with the credentials.';
            } else if (error.status === 500) {
              this.error = 'Something went wrong in the server.';
            } else {
              this.error = 'Undetermined error.';
            }
          });
    }
  }
}
