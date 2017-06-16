import { SearchComponent } from './search.component';
import { EmployeeService } from '../../../services/employee.service';
import { Router } from '@angular/router';
import { anyString, anything, instance, mock, verify, when } from 'ts-mockito';
import { Observable, Subject } from 'rxjs/Rx';
import { Account } from '../../../models/account';
import { FormControl } from '@angular/forms';
import { fakeAsync, tick } from '@angular/core/testing';

describe('SearchComponent', () => {

  let componentUnderTest: SearchComponent;

  let employeeService: EmployeeService;
  let router: Router;

  const usernameAccount = new Account();
  const firstNameAccount = new Account();
  const lastNameAccount = new Account();
  const employees: Account[] = [usernameAccount, firstNameAccount, lastNameAccount];

  beforeEach(() => {
    usernameAccount.username = 'username';
    firstNameAccount.firstName = 'firstName';
    lastNameAccount.lastName = 'lastName';
  });

  beforeEach(() => {
    employeeService = mock(EmployeeService);
    router = mock(Router);

    componentUnderTest = new SearchComponent(instance(employeeService), instance(router));
  });

  describe('ngOnInit', () => {

    it('should retrieve the employees from the employeeService', () => {
      const employeesSubject = new Subject();
      when(employeeService.getAllEmployees()).thenReturn(employeesSubject.asObservable());

      componentUnderTest.ngOnInit();
      employeesSubject.next(employees)

      expect(componentUnderTest.employees).toEqual(employees);
    });

    it('should initialize the filteredOptions field', () => {
      when(employeeService.getAllEmployees()).thenReturn(Observable.empty());

      componentUnderTest.ngOnInit();

      expect(componentUnderTest.filteredOptions).not.toBeNull()
    });

  });

  describe('filteredOptions', () => {

    beforeEach(() => {
      when(employeeService.getAllEmployees()).thenReturn(Observable.of(employees));
    });

    it('should return an empty array if the searchText is empty', () => {
      componentUnderTest.ngOnInit();

      componentUnderTest.filteredOptions.subscribe((data: Account[]) => {
        expect(data).toEqual([]);
      });

      componentUnderTest.searchTextControl.setValue('');
    });

    it('should return an empty array if the searchText is only whitespace', () => {

      componentUnderTest.ngOnInit();

      componentUnderTest.filteredOptions.subscribe((data: Account[]) => {
        expect(data).toEqual([]);
      });

      componentUnderTest.searchTextControl.setValue('  ');
    });

    it('should return an empty array if the searchText is not blank', () => {
      componentUnderTest.ngOnInit();

      componentUnderTest.filteredOptions.subscribe((data: Account[]) => {
        expect(data).toEqual([usernameAccount]);
      });


      componentUnderTest.searchTextControl.setValue('user');
    });

  });

  describe('filter', () => {

    beforeEach(() => {
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

  describe('showEmployeeDetail', () => {

    it('navigates to the correct page', fakeAsync(() => {
      const employee = new Account();
      const username = 'username';
      employee.username = username;

      const formControlMock = mock(FormControl);
      componentUnderTest.searchTextControl = instance(formControlMock);

      when(router.navigate(anything(), anyString())).thenReturn(Promise.resolve(true));

      componentUnderTest.showEmployeeDetail(employee);
      tick();
      verify(formControlMock.reset()).once();
    }));

  });

});
