import {Response} from '@angular/http';
import {instance, mock, when} from 'ts-mockito';
import {Subject} from 'rxjs/Subject';
import {PrestigeHttp} from './prestige-http.service';
import {environment} from '../../environments/environment';
import {EmployeeService} from './employee.service';
import {Account} from '../models/account';

describe('EmployeeService', () => {

  const employeesEndpoint = `${environment.endPoint}/employees-service/employees`;

  let serviceUnderTest: EmployeeService;
  let http: PrestigeHttp;

  beforeEach(() => {
    http = mock(PrestigeHttp);

    serviceUnderTest = new EmployeeService(
      instance(http));
  });

  describe('getAllEmployees', () => {

    it('should do a GET request to the employees endpoint', (done) => {
      const employeesSubject = new Subject();
      const responseMock = mock(Response);
      const employees = [new Account(), new Account()];

      when(http.get(employeesEndpoint, true))
        .thenReturn(employeesSubject.asObservable());
      when(responseMock.json()).thenReturn({
        _embedded: {
          employees: employees
        }
      });

      serviceUnderTest
        .getAllEmployees()
        .subscribe((actual: Account[]) => {
          expect(actual).toEqual(employees);
          done();
        });

      employeesSubject.next(instance(responseMock));
    });

    it('if the response does not contain employees, returns an empty array', (done) => {
      const employeesSubject = new Subject();
      const responseMock = mock(Response);

      when(http.get(employeesEndpoint, true))
        .thenReturn(employeesSubject.asObservable());
      when(responseMock.json()).thenReturn({
        _embedded: {}
      });

      serviceUnderTest
        .getAllEmployees()
        .subscribe((actual: Account[]) => {
          expect(actual).toEqual([]);
          done();
        });

      employeesSubject.next(instance(responseMock));
    });

  });

  describe('getByUsername', () => {

    it('should do a GET request to the employees/username endpoint', (done) => {
      const employeeSubject = new Subject();
      const responseMock = mock(Response);
      const employee = new Account();
      const username = 'username';

      when(http.get(`${employeesEndpoint}/${username}`, true))
        .thenReturn(employeeSubject.asObservable());
      when(responseMock.json()).thenReturn(employee);

      serviceUnderTest
        .getByUsername(username)
        .subscribe((actual: Account) => {
          expect(actual).toEqual(employee);
          done();
        });

      employeeSubject.next(instance(responseMock));
    });

  });

  describe('updateAccount', () => {

    it('should do a GET request to the employees/username endpoint', (done) => {
      const employeeSubject = new Subject();
      const responseMock = mock(Response);
      const employee = new Account();
      const username = 'username';
      employee.username = username;

      when(http.put(`${employeesEndpoint}/${username}`, employee, true))
        .thenReturn(employeeSubject.asObservable());

      serviceUnderTest
        .updateAccount(employee)
        .subscribe(() => {
          done();
        });

      employeeSubject.next(instance(responseMock));
    });

  });

});
