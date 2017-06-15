import { LocalStorageService } from './local-storage.service';
import { Account } from '../models/account';

describe('LocalStorageService', () => {

  let serviceUnderTest: LocalStorageService;

  const key = 'key';
  const value = 'value';

  beforeEach(() => {
    serviceUnderTest = new LocalStorageService();
    spyOn(localStorage, 'setItem').and.callThrough();
    spyOn(localStorage, 'getItem').and.callThrough();
    spyOn(localStorage, 'removeItem').and.callThrough();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('setString', () => {

    it('should call the localStorage api to save the value under the given key', () => {
      serviceUnderTest.setString(key, value);

      expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
    });

  });

  describe('getString', () => {

    it('should call the localStorage api to get the value under the given key', () => {
      serviceUnderTest.getString(key);

      expect(localStorage.getItem).toHaveBeenCalledWith(key);
    });

  });

  describe('setObject', () => {

    it('should call the localStorage api to save the value under the given key', () => {
      const account = new Account();
      serviceUnderTest.setObject(key, account);

      expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(account));
    });

  });

  describe('getObject', () => {

    it('should call the localStorage api to get the value under the given key in the correct class', () => {
      const account = new Account();
      serviceUnderTest.setObject(key, account)

      serviceUnderTest.getObject<Account>(key);

      expect(localStorage.getItem).toHaveBeenCalledWith(key);
    });

  });

  describe('remove', () => {

    it('should call the localStorage api to remove the value under the given key', () => {
      serviceUnderTest.remove(key);

      expect(localStorage.removeItem).toHaveBeenCalledWith(key);
    });

  });

  describe('removeAll', () => {

    it('should call the localStorage api to remove the values under the given keys', () => {
      const key2 = 'key2';
      serviceUnderTest.removeAll([key, key2]);

      expect(localStorage.removeItem).toHaveBeenCalledWith(key);
      expect(localStorage.removeItem).toHaveBeenCalledWith(key2);
    });

  });


});
