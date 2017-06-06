import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountService } from '../../providers/account.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-registration-form',
    templateUrl: 'registration-form.component.html',
    styleUrls: ['registration-form.component.scss']
})

export class RegistrationFormComponent implements OnInit {

    @ViewChild('registerForm') public registerForm;
    public registrationModel: { handle: string, password: string, passwordCheck: string };
    public error = false;

    constructor(private accountService: AccountService, private router: Router) {
        this.registrationModel = { handle: undefined, password: undefined, passwordCheck: undefined };
    }

    ngOnInit() {
    }

    public passwordsMatch(): boolean {
        return this.registrationModel.password === this.registrationModel.passwordCheck;
    }

    public doRegister() {
        if (this.registerForm.valid) {
            this.error = false;

            this.accountService.register(this.registrationModel.handle, this.registrationModel.password)
                .subscribe((result) => {
                    // redirect to login page
                }, (error) => {
                    if (error.status === 0) {
                        this.error = true;
                    }
                });
        } else {
            this.registerForm.reset();
        }
    }
}
