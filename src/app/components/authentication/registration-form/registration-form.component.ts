import { AuthService } from '../../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: 'registration-form.component.html',
  styleUrls: ['registration-form.component.scss']
})

export class RegistrationFormComponent {

  @ViewChild('registerForm') public registerForm;
  public registrationModel: { handle: string, password: string, passwordCheck: string };
  public error: string;

  constructor(private authService: AuthService, private router: Router) {
    this.registrationModel = {handle: undefined, password: undefined, passwordCheck: undefined};
  }

  public passwordsMatch(): boolean {
    return this.registrationModel.password === this.registrationModel.passwordCheck;
  }

  public doRegister() {
    if (this.registerForm.valid) {
      this.error = null;

      this.authService
        .register(this.registrationModel.handle, this.registrationModel.password, this.registrationModel.passwordCheck)
        .subscribe(() => {
          this.router.navigate(['/login']);
        }, (error) => {
          if (error.status === 0) {
            this.error = 'No connection could be made to the backend.';
          } else if (error.status === 400) {
            this.error = 'Check if your github handle is in the Ordina Github organization.'
          } else {
            this.error = 'Something went wrong during registration.';
          }
        });
    }
  }
}
