import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {LoginFormComponent} from './login-form.component';
import { capture, instance, mock, verify, when, deepEqual } from 'ts-mockito';
import {NgForm} from '@angular/forms';

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
      componentUnderTest.loginModel = {handle: username, password};

      componentUnderTest.login();
      subject.next();

      verify(router.navigate(deepEqual(['/endorsement-feed']))).once();
    });

    it('should call login on the authservice and set error to correct message if status is 0', () => {
      const subject = new Subject<void>();

      when(authService.login(username, password))
        .thenReturn(subject.asObservable());
      when(loginForm.valid).thenReturn(true);
      componentUnderTest.loginModel = {handle: username, password};

      componentUnderTest.login();
      subject.error({status: 0});

      expect(componentUnderTest.error).toEqual('No connection could be made to the backend.');
    });

    it('should call login on the authservice and set error to correct message if status is 401', () => {
      const subject = new Subject<void>();

      when(authService.login(username, password))
        .thenReturn(subject.asObservable());
      when(loginForm.valid).thenReturn(true);
      componentUnderTest.loginModel = {handle: username, password};

      componentUnderTest.login();
      subject.error({status: 401});

      expect(componentUnderTest.error).toEqual('There was something wrong with the credentials.');
    });

    it('should call login on the authservice and set error to correct message if status is 500', () => {
      const subject = new Subject<void>();

      when(authService.login(username, password))
        .thenReturn(subject.asObservable());
      when(loginForm.valid).thenReturn(true);
      componentUnderTest.loginModel = {handle: username, password};

      componentUnderTest.login();
      subject.error({status: 500});

      expect(componentUnderTest.error).toEqual('Something went wrong in the server.');
    });

    it('should call login on the authservice and set error to correct message if status is something else than 0, 401 or 500', () => {
      const subject = new Subject<void>();
      when(authService.login(username, password))
        .thenReturn(subject.asObservable());
      when(loginForm.valid).thenReturn(true);
      componentUnderTest.loginModel = {handle: username, password};

      componentUnderTest.login();
      subject.error({status: 403});

      expect(componentUnderTest.error).toEqual('Undetermined error.');
    });

  });

});
