import {Account} from '../models/account';
import {CookieService} from 'ngx-cookie';
import {Injectable} from '@angular/core';
import {constants} from '../util/constants';
import {LocalStorageService} from './local-storage.service';

@Injectable()
export class UserService {

  constructor(private localStorageService: LocalStorageService) {
  }

  getCurrentUser(): Account {
    return this.localStorageService.getObject<Account>(constants.storageKeys.CURRENT_USER);
  }

  getCurrentUsername(): string | undefined {
    return this.getCurrentUser() ? this.getCurrentUser().username : undefined;
  }

  isUserLoggedIn(): boolean {
    return this.getCurrentUser() != null;
  }

  getCurrentUserToken(): string | undefined {
    return this.localStorageService.getString(constants.storageKeys.TOKEN);
  }

  saveCurrentUserToken(token: string) {
    this.localStorageService.setString(constants.storageKeys.TOKEN, token);
  }

  saveCurrentUser(user: Account) {
    this.localStorageService.setObject(constants.storageKeys.CURRENT_USER, user);
  }

  removeCurrentUserData() {
    this.localStorageService.removeAll([constants.storageKeys.CURRENT_USER, constants.storageKeys.TOKEN]);
  }

}
