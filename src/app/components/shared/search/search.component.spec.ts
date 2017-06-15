import { SearchComponent } from './search.component';
import { EmployeeService } from '../../../services/employee.service';
import { Router } from '@angular/router';
import { instance, mock, when } from 'ts-mockito';
import { Observable, Subject } from 'rxjs/Rx';
import { Account } from '../../../models/account';
describe('SearchComponent', () => {

  let componentUnderTest: SearchComponent;

  let employeeService: EmployeeService;
  let router: Router;

  beforeEach(() => {
    employeeService = mock(EmployeeService);
    router = mock(Router);

    componentUnderTest = new SearchComponent(instance(employeeService), instance(router));
  });

  describe('ngOnInit', () => {

    it('should retrieve the employees from the employeeService', () => {
      const employees = [new Account(), new Account()];
      const employeesSubject = new Subject();
      when(employeeService.getAllEmployees()).thenReturn(employeesSubject.asObservable());

      componentUnderTest.ngOnInit();
      employeesSubject.next(employees)

      expect(componentUnderTest.employees).toEqual(employees);
    });

    it('should initialize the filteredOptions field', () => {
      when(employeeService.getAllEmployees()).thenReturn(Observable.empty());

      componentUnderTest.ngOnInit();

      expect(componentUnderTest.filteredOptions).toEqual(jasmine.any(Observable));
    });

  });

  describe('filter', () => {

    const usernameAccount = new Account();
    const firstNameAccount = new Account();
    const lastNameAccount = new Account();
    const employees: Account[] = [usernameAccount, firstNameAccount, lastNameAccount];

    beforeEach(() => {
      usernameAccount.username = 'username';
      firstNameAccount.firstName = 'firstName';
      lastNameAccount.lastName = 'lastName';

      componentUnderTest.employees = employees;
    });

    it('when the searchText appears in the firstname of an account, it should be returned', () => {
      const actual = componentUnderTest.filter('fir');

      expect(actual).toEqual([firstNameAccount]);
    });

    it('when the searchText appears in the lastname of an account, it should be returned', () => {
      const actual = componentUnderTest.filter('las');

      expect(actual).toEqual([lastNameAccount]);
    });

    it('when the searchText appears in the username of an account, it should be returned', () => {
      const actual = componentUnderTest.filter('use');

      expect(actual).toEqual([usernameAccount]);
    });

    it('when the searchText does not appear in the username, lastName or firstName of an account, it should return an empty array', () => {
      const actual = componentUnderTest.filter('xsxhuiw');

      expect(actual).toEqual([]);
    });

    it('should search case insensitive', () => {
      const actual = componentUnderTest.filter('nAmE');

      expect(actual).toEqual(employees);
    });

  });

});
