import { EmployeeSearchComponent } from './employee-search.component';
import { EmployeeService } from '../../../services/employee.service';
import { Router } from '@angular/router';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { Observable, Subject } from 'rxjs/Rx';
import { Account } from '../../../models/account';
import { FormControl } from '@angular/forms';

describe('EmployeeSearchComponent', () => {

  let componentUnderTest: EmployeeSearchComponent;

  let employeeService: EmployeeService;
  let router: Router;

  const usernameAccount = new Account();
  const firstNameAccount = new Account();
  const lastNameAccount = new Account();
  const employees: Account[] = [usernameAccount, firstNameAccount, lastNameAccount];
  const formControlMock = mock(FormControl);

  beforeEach(() => {
    usernameAccount.username = 'username';
    firstNameAccount.firstName = 'firstName';
    lastNameAccount.lastName = 'lastName';
  });

  beforeEach(() => {
    employeeService = mock(EmployeeService);
    router = mock(Router);

    componentUnderTest = new EmployeeSearchComponent(instance(employeeService));
  });

  describe('ngOnInit', () => {

    it('should initialize the filteredOptions field', () => {
      componentUnderTest.ngOnInit();

      expect(componentUnderTest.filteredOptions).not.toBeNull()
    });

  });

  describe('filteredOptions', () => {

    const searchText = 'searchText';
    let valueSubject: Subject<string>;

    beforeEach(() => {
      valueSubject = new Subject();
      componentUnderTest.searchTextControl = instance(formControlMock);
      when(formControlMock.valueChanges).thenReturn(valueSubject.asObservable());
    });

    it('should assign the filteredOptions when the valueChanges fires.',
      (done) => {
        when(employeeService.searchEmployees(deepEqual({
          username: searchText,
          firstName: '',
          lastName: ''
        }))).thenReturn(Observable.of(employees));
        componentUnderTest.ngOnInit();

        componentUnderTest.filteredOptions.subscribe((actual: Account[]) => {
          expect(actual).toEqual(employees);
          done();
        });

        valueSubject.next(searchText);
      });

    it('should reset the value if itemSelected is true.',
      (done) => {
        componentUnderTest.onEmployeeSelect = employee => {
        };
        componentUnderTest.ngOnInit();

        componentUnderTest.filteredOptions
          .subscribe(
            (value: any) => {
              expect(value).toEqual([]);
              verify(formControlMock.reset()).called();
              done();
            },
            (value: any) => {
              fail(value);
              done();
            },
            () => {
              fail();
              done();
            }
          );

        componentUnderTest.employeeSelectAction(null); // set itemSelected to true
        valueSubject.next(searchText);
      });
  });

  describe('reset', () => {

    it('should call reset on the textControl', () => {
      componentUnderTest.searchTextControl = instance(formControlMock);
      componentUnderTest.reset();
      verify(formControlMock.reset()).atLeast(1);
    });

  });

});
