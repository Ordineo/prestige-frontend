import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoginFormComponent } from './login-form.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {mock, when, verify, instance, capture} from 'ts-mockito';
import { Observable } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';

describe('LoginFormComponent', () => {

  let componentUnderTest: LoginFormComponent;
  let authService: AuthService, router: Router;
  let loginForm: NgForm;

  const username = 'username';
  const password = 'password';

  beforeEach(() => {
    router = mock(Router);
    authService = mock(AuthService);
    loginForm = mock(NgForm);

    componentUnderTest = new LoginFormComponent(instance(authService), instance(router));
    componentUnderTest.loginForm = loginForm;
  });

  describe('login', () => {

    it('should call login on the authservice and navigate to the feed when successful', () => {
      const subject = new Subject<void>();
      when(authService.login(username, password)).thenReturn(subject.asObservable());
      when(loginForm.valid).thenReturn(true);
      componentUnderTest.loginModel = { handle: username, password };

      componentUnderTest.login();
      subject.next();

      const [firstArg] = capture(router.navigate).last();
      expect(firstArg).toEqual(['/endorsement-feed']);
    });

    it('should call login on the authservice and set notInCommunity to true if message is "Cannot pass null or empty values to constructor"', () => {
      const subject = new Subject<void>();
      const error = {
        message: 'Authentication Failed: Cannot pass null or empty values to constructor'
      };
      when(authService.login(username, password))
        .thenReturn(subject.asObservable());
      when(loginForm.valid).thenReturn(true);
      componentUnderTest.loginModel = { handle: username, password };

      componentUnderTest.login();
      subject.error({ json: () => error });

      expect(componentUnderTest.notInCommunity).toBeTruthy();
    });

    it('should call login on the authservice and set error to true if message is "Authentication Failed: Bad credentials"', () => {
      const subject = new Subject<void>();
      const error = {
        message: 'Authentication Failed: Bad credentials'
      };
      when(authService.login(username, password))
        .thenReturn(subject.asObservable());
      when(loginForm.valid).thenReturn(true);
      componentUnderTest.loginModel = { handle: username, password };

      componentUnderTest.login();
      subject.error({
        json: () => error
      });

      expect(componentUnderTest.error).toBeTruthy();
    });

    it('should call login on the authservice and set error to true if status is 0', () => {
      const subject = new Subject<void>();
      const errObj = {message: ''};
      const error = {
        status: 0,
        json: () => errObj
      };
      when(authService.login(username, password))
        .thenReturn(subject.asObservable());
      when(loginForm.valid).thenReturn(true);
      componentUnderTest.loginModel = { handle: username, password };

      componentUnderTest.login();
      subject.error(error);

      verify(router.navigate(['/endorsement-feed'])).never();
      expect(componentUnderTest.error).toBeTruthy();
    });

  });

});
