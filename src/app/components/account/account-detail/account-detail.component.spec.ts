import {Account} from '../../../models/account';
import {EmployeeService} from '../../../services/employee.service';
import {UserService} from '../../../services/user.service';
import {instance, mock, reset, verify, when} from 'ts-mockito';

import {AccountDetailComponent} from './account-detail.component';
import {MdDialogRef} from '@angular/material';
import {Subject} from 'rxjs/Subject';

describe('AccountDetailComponent', () => {

  let componentUnderTest: AccountDetailComponent;
  const userService: UserService = mock(UserService);
  const dialogRef: MdDialogRef<any> = mock(MdDialogRef);
  const employeeService: EmployeeService = mock(EmployeeService);

  const username = 'username';
  const account = new Account();

  beforeEach(() => {
    componentUnderTest = new AccountDetailComponent(instance(userService), instance(dialogRef), instance(employeeService));
  });

  afterEach(() => {
      reset(dialogRef);
      reset(userService);
      reset(employeeService);
  });

  describe('ngOnInit', () => {

    it('should fetch the current user account', () => {
      const subject = new Subject();

      when(userService.getCurrentUsername()).thenReturn(username);
      when(employeeService.getByUsername(username)).thenReturn(subject.asObservable());

      componentUnderTest.ngOnInit();
      subject.next(account);

      expect(componentUnderTest.account).toEqual(account);
    });
  });

  describe('saveAccount', () => {

    it('should call the updateAccount on the employeeService and close the dialog', () => {
      const subject = new Subject();

      when(employeeService.updateAccount(account)).thenReturn(subject.asObservable());
      componentUnderTest.account = account;

      componentUnderTest.saveAccount();
      subject.next();

      verify(dialogRef.close()).called();
    });

    it('should call the updateAccount on the employeeService and not close the dialog when error returns', () => {
      const subject = new Subject();
      when(employeeService.updateAccount(account)).thenReturn(subject.asObservable());
      componentUnderTest.account = account;

      componentUnderTest.saveAccount();
      subject.error('error');

      verify(dialogRef.close()).never();
    });
  });
});
