import {AuthService} from './auth.service';
import {Response, ResponseOptions} from '@angular/http';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {EmployeeService} from './employee.service';
import {capture, deepEqual, instance, mock, verify, when} from 'ts-mockito';
import {Subject} from 'rxjs/Subject';
import {Account} from '../models/account';
import {PrestigeHttp} from './prestige-http.service';
import {environment} from '../../environments/environment';

describe('AuthService', () => {

  const loginEndPoint = `${environment.endPoint}/employees-service/login`;
  const registerEndpoint = `${environment.endPoint}/employees-service/register`;
  const username = 'username';
  const password = 'password';

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
      const currentAccount = new Account();
      const loginSubject = new Subject<Response>();
      const currentUserSubject = new Subject<Account>();

      when(http.post(deepEqual(loginEndPoint), deepEqual({
        username,
        password
      }), false)).thenReturn(loginSubject.asObservable());
      when(employeeService.getByUsername(username)).thenReturn(currentUserSubject.asObservable());

      serviceUnderTest
        .login(username, password)
        .subscribe(() => {
          verify(userService.saveCurrentUserToken(token)).once();
          verify(userService.saveCurrentUser(currentAccount)).once();
          done();
        });

      loginSubject.next(createResponseWithText(token));
      currentUserSubject.next(currentAccount);
    });

  });

  describe('register', () => {

    it('should do a request to the register url', (done) => {
      const registerSubject = new Subject();

      when(http.post(`${registerEndpoint}?username=${username}&password=${password}`, null, false))
        .thenReturn(registerSubject.asObservable());

      serviceUnderTest.register(username, password)
        .subscribe(() => {
          done();
        });

      registerSubject.next();
    });

  });

  describe('logout', () => {

    it('should call the userservice and navigate to the login', () => {
      serviceUnderTest.logout();

      verify(userService.removeCurrentUserData()).called();

      const [firstArg] = capture(router.navigate).last();
      expect(firstArg).toEqual(['/login']);
    })

  });

});

const createResponseWithText = (text: string): Response => {
  const responseOptions = new ResponseOptions({body: text});
  return new Response(responseOptions);
}
