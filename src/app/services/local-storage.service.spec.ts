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

    it('should call the localStorage api to get the value under the given key', () => {
      const actual = serviceUnderTest.getString(key);

      expect(actual).toBeNull();
    });

  });

  describe('setObject', () => {

    it('should call the localStorage api to save the value under the given key', () => {
      const account = new Account();
      serviceUnderTest.setObject(key, account);

      expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(account));
    });

    it('should throw error if value is not an object', () => {
      try {
        serviceUnderTest.setObject(key, 'not an object');
      } catch (e) {
        expect((<Error>e).message).toEqual('Value should be an object, otherwise use setString(value: string) function');
      }
    });

  });

  describe('getObject', () => {

    it('should call the localStorage api to get the value under the given key in the correct class', () => {
      const account = new Account();
      serviceUnderTest.setObject(key, account)

      serviceUnderTest.getObject<Account>(key);

      expect(localStorage.getItem).toHaveBeenCalledWith(key);
    });

    it('should return null if the localstorage returns null', () => {
      const actual = serviceUnderTest.getObject<Account>(key);

      expect(actual).toBeNull();
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
