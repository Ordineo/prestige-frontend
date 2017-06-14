import {capture, instance, mock, verify, when} from 'ts-mockito';
import {LocalStorageService} from './local-storage.service';
import {UserService} from './user.service';
import {constants} from '../util/constants';
import {Account} from '../models/account';

describe('UserService', () => {

  let serviceUnderTest: UserService;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    localStorageService = mock(LocalStorageService);

    serviceUnderTest = new UserService(
      instance(localStorageService)
    );
  });

  describe('getCurrentUser', () => {

    it('should call the localStorageService with the right token', () => {
      const user = new Account();
      when(localStorageService.getObject<Account>(constants.storageKeys.CURRENT_USER)).thenReturn(user);

      const actual = serviceUnderTest.getCurrentUser();

      expect(actual).toEqual(user);
    });

  });

  describe('getCurrentUsername', () => {

    it('should call the localStorageService with the right token', () => {
      const user = new Account();
      const username = 'username';
      user.username = username;
      when(localStorageService.getObject(constants.storageKeys.CURRENT_USER)).thenReturn(user);

      const actual = serviceUnderTest.getCurrentUsername();

      expect(actual).toEqual(username);
    });

  });

  describe('isUserLoggedIn', () => {

    it('should return true if currentUser is not undefined', () => {
      const user = new Account();
      when(localStorageService.getObject(constants.storageKeys.CURRENT_USER)).thenReturn(user);

      const actual = serviceUnderTest.isUserLoggedIn();

      expect(actual).toBeTruthy();
    });

    it('should return false if currentUser is undefined', () => {
      when(localStorageService.getObject(constants.storageKeys.CURRENT_USER)).thenReturn(undefined);

      const actual = serviceUnderTest.isUserLoggedIn();

      expect(actual).toBeFalsy();
    });
  });

  describe('getCurrentUserToken', () => {

    it('should call the localStorageService with the right token', () => {
      const token = 'token';
      when(localStorageService.getString(constants.storageKeys.TOKEN)).thenReturn(token);

      const actual = serviceUnderTest.getCurrentUserToken();

      expect(actual).toEqual(token);
    });

  });


  describe('saveCurrentUser', () => {

    it('should call the localStorageService with the right token', () => {
      const user = new Account();

      serviceUnderTest.saveCurrentUser(user);

      verify(localStorageService.setObject(constants.storageKeys.CURRENT_USER, user)).once();
    });

  });

  describe('removeCurrentUserData', () => {

    it('should call the localStorageService with the right tokens', () => {
      serviceUnderTest.removeCurrentUserData();

      const [keys] = capture(localStorageService.removeAll).last();
      expect(keys).toEqual([constants.storageKeys.CURRENT_USER, constants.storageKeys.TOKEN]);
    });

  });

});
