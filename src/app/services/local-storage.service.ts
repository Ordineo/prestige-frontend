import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {

  getObject<T>(key: string): T {
    const value = localStorage.getItem(key);
    return JSON.parse(value) as T;
  }

  setObject<T>(key: string, value: T): void {
    if (typeof value !== 'object') {
      throw new Error('Value should be an object, otherwise use setString(value: string) function');
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  getString(key: string): string {
    return localStorage.getItem(key);
  }

  setString(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  removeAll(keys: string[]): void {
    keys.forEach(key => this.remove(key));
  }

}
