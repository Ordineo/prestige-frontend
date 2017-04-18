import {Component, OnInit} from '@angular/core';
import {gatekeeperConfig} from "../node.config";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  constructor(private _formBuilder: FormBuilder) {
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

  check() {
    console.log(this.errors);
  }

  ngOnInit() {
  }

}
