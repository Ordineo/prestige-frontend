import { SearchComponent } from './search.component';
import { EmployeeService } from '../../../services/employee.service';
import { Router } from '@angular/router';
import { anyString, anything, instance, mock, verify, when, deepEqual } from 'ts-mockito';
import { Observable, Subject, TestScheduler } from 'rxjs/Rx';
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

    it('should initialize the filteredOptions field', () => {
      componentUnderTest.ngOnInit();

      expect(componentUnderTest.filteredOptions).not.toBeNull()
    });

  });

  describe('filteredOptions', () => {

    const searchText = 'searchText';
    const formControlMock = mock(FormControl);
    let valueSubject: Subject<string>;

    beforeEach(() => {
      valueSubject = new Subject();
      componentUnderTest.searchTextControl = instance(formControlMock);
      when(formControlMock.valueChanges).thenReturn(valueSubject.asObservable());
    });

    it('should assign the filteredOptions when the valueChanges fires.',
      (done) => {
        when(employeeService.searchEmployees(deepEqual({ username: searchText, firstName: '', lastName: '' }))).thenReturn(Observable.of(employees));
        componentUnderTest.ngOnInit();

        componentUnderTest.filteredOptions.subscribe((actual: Account[]) => {
          expect(actual).toEqual(employees);
          done();
        });

        valueSubject.next(searchText);
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
