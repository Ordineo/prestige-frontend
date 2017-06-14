import {anything, capture, instance, mock, verify, when} from 'ts-mockito';
import {UserService} from '../../../services/user.service';
import {ToolbarComponent} from './toolbar.component';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {AuthService} from '../../../services/auth.service';
import {Account} from '../../../models/account';
import {AccountDetailComponent} from '../../account/account-detail/account-detail.component';
import {AddEndorsementComponent} from '../../endorsements/add-endorsement/add-endorsement.component';
import {Observable} from 'rxjs/Observable';

describe('ToolbarComponent', () => {

  let componentUnderTest: ToolbarComponent;

  let userService: UserService;
  let dialog: MdDialog;
  let authService: AuthService;

  beforeEach(() => {
    userService = mock(UserService);
    dialog = mock(MdDialog);
    authService = mock(AuthService);

    componentUnderTest = new ToolbarComponent(
      instance(dialog),
      instance(authService),
      instance(userService));
  });

  describe('getLoggedInUsername', () => {

    it('gets the username from the userService', () => {
      const username = 'username';
      when(userService.getCurrentUsername()).thenReturn(username);

      const actual = componentUnderTest.getLoggedInUsername();

      expect(actual).toEqual(username);
    });

  });

  describe('isUserLoggedIn', () => {

    it('when userservice says true, returns true', () => {
      const isUserLoggedIn = true;
      when(userService.isUserLoggedIn()).thenReturn(isUserLoggedIn);

      const actual = componentUnderTest.isUserLoggedIn();

      expect(actual).toEqual(isUserLoggedIn);
    });

    it('when userservice says false, returns false', () => {
      const isUserLoggedIn = false;
      when(userService.isUserLoggedIn()).thenReturn(isUserLoggedIn);

      const actual = componentUnderTest.isUserLoggedIn();

      expect(actual).toEqual(isUserLoggedIn);
    });

  });

  describe('getLoggedInUserAvatar', () => {

    it('when userService returns a user, returns the avatar of the user', () => {
      const currentUser = new Account();
      const avatar = 'someavatarstring';
      currentUser.avatar = avatar;
      when(userService.getCurrentUser()).thenReturn(currentUser);

      const actual = componentUnderTest.getLoggedInUserAvatar();

      expect(actual).toEqual(avatar);
    });

    it('when userService returns undefined, returns undefined', () => {
      when(userService.getCurrentUser()).thenReturn(undefined);

      const actual = componentUnderTest.getLoggedInUserAvatar();

      expect(actual).toBeUndefined();
    });

  });

  describe('openAccountDetail', () => {

    it('should open the dialog', () => {
      const dialogRef = mock(MdDialogRef);
      dialogRef.afterClosed = () => Observable.empty();
      when(dialog.open(anything(), anything())).thenReturn(dialogRef);

      componentUnderTest.openAccountDetail();

      const args = capture(dialog.open).last();
      expect(args.length).toEqual(2);
      expect(args[0]).toEqual(AccountDetailComponent);
      expect(args[1]).toEqual(jasmine.any(MdDialogConfig));

      expect(componentUnderTest.dialogRef).not.toBeNull();
    });

  });

  describe('openAddEndorsement', () => {

    it('should open the dialog', () => {
      const dialogRef = mock(MdDialogRef);
      dialogRef.afterClosed = () => Observable.empty();
      when(dialog.open(anything(), anything())).thenReturn(dialogRef);

      componentUnderTest.openAddEndorsement();

      const args = capture(dialog.open).last();
      expect(args.length).toEqual(2);
      expect(args[0]).toEqual(AddEndorsementComponent);
      expect(args[1]).toEqual(jasmine.any(MdDialogConfig));

      expect(componentUnderTest.dialogRef).not.toBeNull();
    });

  });

  describe('logout', () => {

    it('should delegate to the authService', () => {
      componentUnderTest.logout();

      verify(authService.logout()).once();
    });

  });
});
