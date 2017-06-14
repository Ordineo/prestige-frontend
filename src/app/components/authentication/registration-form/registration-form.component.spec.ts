import {instance} from 'ts-mockito/lib/ts-mockito';
import {RegistrationFormComponent} from './registration-form.component';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {capture, mock, when} from 'ts-mockito';
import {Subject} from 'rxjs/Rx';
import {NgForm} from '@angular/forms';

describe('RegistrationFormComponent', () => {

  let componentUnderTest: RegistrationFormComponent;
  let authService: AuthService, router: Router;
  let registerForm: NgForm;

  const username = 'username';
  const password = 'password';

  beforeEach(() => {
    router = mock(Router);
    authService = mock(AuthService);
    registerForm = mock(NgForm);

    componentUnderTest = new RegistrationFormComponent(instance(authService), instance(router));
    componentUnderTest.registerForm = registerForm;
  });

  describe('doRegister', () => {

    it('should call registration on the authservice and navigate to the login when successful', () => {
      const subject = new Subject();
      when(authService.register(username, password, password)).thenReturn(subject.asObservable());
      when(registerForm.valid).thenReturn(true);
      componentUnderTest.registrationModel = { handle: username, password, passwordCheck: password };

      componentUnderTest.doRegister();
      subject.next();

      const [firstArg] = capture(router.navigate).last();
      expect(firstArg).toEqual(['/login']);
    });

    it('should call register on the authservice and set error to correct message if status is 0', () => {
      const subject = new Subject();
      const error = { status: 0 };
      when(authService.register(username, password, password)).thenReturn(subject.asObservable());
      when(registerForm.valid).thenReturn(true);
      componentUnderTest.registrationModel = { handle: username, password, passwordCheck: password };

      componentUnderTest.doRegister();
      subject.error(error);

      expect(componentUnderTest.error).toEqual('No connection could be made to the backend.');
    });

    it('should call register on the authservice and set error to correct message if status is 400', () => {
      const subject = new Subject();
      const error = { status: 400 };
      when(authService.register(username, password, password)).thenReturn(subject.asObservable());
      when(registerForm.valid).thenReturn(true);
      componentUnderTest.registrationModel = { handle: username, password, passwordCheck: password };

      componentUnderTest.doRegister();
      subject.error(error);

      expect(componentUnderTest.error).toEqual('Check if your github handle is in the Ordina Github organization.');
    });

    it('should call register on the authservice and set error to correct message if status is something else than 0 and 401', () => {
      const subject = new Subject();
      const error = { status: 500 };
      when(authService.register(username, password, password)).thenReturn(subject.asObservable());
      when(registerForm.valid).thenReturn(true);
      componentUnderTest.registrationModel = { handle: username, password, passwordCheck: password };

      componentUnderTest.doRegister();
      subject.error(error);

      expect(componentUnderTest.error).toEqual('Something went wrong during registration.');
    });
  });

  describe('passwordsMatch', () => {

    it('should return true if the passwords match', () => {
      componentUnderTest.registrationModel = { handle: username, password, passwordCheck: password };
      expect(componentUnderTest.passwordsMatch()).toBeTruthy();
    });

    it('should return false if the passwords don\'t match', () => {
      componentUnderTest.registrationModel = { handle: username, password, passwordCheck: 'something else' };
      expect(componentUnderTest.passwordsMatch()).toBeFalsy();
    });

  });

});
