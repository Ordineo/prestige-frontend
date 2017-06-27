import { Response } from '@angular/http';
import { instance, mock, when } from 'ts-mockito';
import { Subject } from 'rxjs/Subject';
import { PrestigeHttp } from './prestige-http.service';
import { environment } from '../../environments/environment';
import { EmployeeService } from './employee.service';
import { Account } from '../models/account';
import { Page } from '../models/page';
import { PageInfo } from '../models/pageinfo';

describe('EmployeeService', () => {

  const employeesEndpoint = `${environment.endPoint}/employees-service/employees`;

  let serviceUnderTest: EmployeeService;
  let http: PrestigeHttp;

  beforeEach(() => {
    http = mock(PrestigeHttp);

    serviceUnderTest = new EmployeeService(
      instance(http));
  });

  describe('getEmployees', () => {

    const page = 0;
    const size = 20;

    it('should do a GET request to the employeesPage endpoint', (done) => {
      const employeesSubject = new Subject();
      const responseMock = mock(Response);
      const employees = [new Account(), new Account()];

      when(http.get(`${employeesEndpoint}?page=${page}&size=${size}`, true))
        .thenReturn(employeesSubject.asObservable());
      when(responseMock.json()).thenReturn({
        _embedded: {
          employees: employees,
          pageInfo: PageInfo.createPageInfo({size, totalElements: size, totalPages: 5, number: page})
        }
      });

      serviceUnderTest
        .getEmployees(page, size)
        .subscribe((actual: Page<Account>) => {
          expect(actual.items).toEqual(employees);
          done();
        });

      employeesSubject.next(instance(responseMock));
    });

    it('if the response does not contain employeesPage, returns an empty array', (done) => {
      const employeesSubject = new Subject();
      const responseMock = mock(Response);

      when(http.get(`${employeesEndpoint}?page=${page}&size=${size}`, true))
        .thenReturn(employeesSubject.asObservable());
      when(responseMock.json()).thenReturn({
        _embedded: {},
        pageInfo: PageInfo.createPageInfo({size, totalElements: size, totalPages: 5, number: page})
      });

      serviceUnderTest
        .getEmployees(page, size)
        .subscribe((actual: Page<Account>) => {
          expect(actual.items).toEqual([]);
          done();
        });

      employeesSubject.next(instance(responseMock));
    });

  });

  describe('searchEmployees', () => {

    it('should do a GET request to the employeesPage endpoint', (done) => {
      const employeesSubject = new Subject();
      const responseMock = mock(Response);
      const employees = [new Account(), new Account()];

      when(http.get(`${employeesEndpoint}?search=username:username,firstName:firstName,lastName:lastName&page=0&size=5`, true))
        .thenReturn(employeesSubject.asObservable());
      when(responseMock.json()).thenReturn({
        _embedded: {
          employees: employees
        }
      });

      serviceUnderTest
        .searchEmployees({username: 'username', firstName: 'firstName', lastName: 'lastName'})
        .subscribe((actual: Account[]) => {
          expect(actual).toEqual(employees);
          done();
        });

      employeesSubject.next(instance(responseMock));
    });

    it('if the response does not contain employeesPage, returns an empty array', (done) => {
      const employeesSubject = new Subject();
      const responseMock = mock(Response);

      when(http.get(`${employeesEndpoint}?search=username:username,firstName:firstName,lastName:lastName&page=0&size=5`, true))
        .thenReturn(employeesSubject.asObservable());
      when(responseMock.json()).thenReturn({
        _embedded: {}
      });

      serviceUnderTest
        .searchEmployees({username: 'username', firstName: 'firstName', lastName: 'lastName'})
        .subscribe((actual: Account[]) => {
          expect(actual).toEqual([]);
          done();
        });

      employeesSubject.next(instance(responseMock));
    });

  });

  describe('getByUsername', () => {

    it('should do a GET request to the employeesPage/username endpoint', (done) => {
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

    it('should do a GET request to the employeesPage/username endpoint', (done) => {
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
