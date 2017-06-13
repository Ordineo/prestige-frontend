import {AuthService} from './auth.service';
import {Http, Response, ResponseOptions} from '@angular/http';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {EmployeeService} from './employee.service';
import {anyString, anything, instance, mock, verify, when} from 'ts-mockito';
import {Subject} from 'rxjs/Subject';
import {Account} from '../models/account';
import {PrestigeHttp} from './prestige-http.service';

describe('AuthService', () => {

  let serviceUnderTest: AuthService;
  let http: PrestigeHttp;
  let userService: UserService;
  let router: Router;
  let employeeService: EmployeeService;

  beforeEach(() => {
    http = mock(PrestigeHttp);
    userService = mock(UserService);
    router = mock(Router);
    employeeService = mock(EmployeeService);

    serviceUnderTest = new AuthService(
      instance(http),
      instance(userService),
      instance(router),
      instance(employeeService));
  });

  describe('login', () => {

    it('should do the login and save the resulting data', (done) => {
      const token = 'token';
      const username = 'username';
      const currentAccount = new Account();
      const loginSubject = new Subject<Response>();
      const currentUserSubject = new Subject<Account>();
      const loginObservable = loginSubject.asObservable();
      loginObservable['test'] = 'test';
      when(http.post(anyString(), anything(), false)).thenReturn(loginObservable);
      when(employeeService.getByUsername(username)).thenReturn(currentUserSubject.asObservable());

      serviceUnderTest
        .login(username, 'password')
        .subscribe(() => {
          verify(userService.saveCurrentUserToken(token)).once();
          verify(userService.saveCurrentUser(currentAccount)).once();
          done();
        });

      loginSubject.next(createResponseWithText(token));
      currentUserSubject.next(currentAccount);
    });

  });

});

const createResponseWithText = (text: string): Response => {
  const responseOptions = new ResponseOptions({body: text});
  return new Response(responseOptions);
}
