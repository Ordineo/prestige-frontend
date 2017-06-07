import { Account } from '../models/account';
import { CookieService } from 'ngx-cookie';
import { Injectable } from '@angular/core';
import { constants } from '../util/constants';

@Injectable()
export class UserService {

    constructor(
        private cookieService: CookieService
    ) { }

    getCurrentUser(): Account {
        return this.cookieService.getObject(constants.cookieKeys.CURRENT_USER) as Account;
    }

    getCurrentUsername(): string | undefined {
        return this.getCurrentUser() ? this.getCurrentUser().username : undefined;
    }

    isUserLoggedIn(): boolean {
        return this.getCurrentUser() != null;
    }

    getCurrentUserToken(): string | undefined {
        return this.cookieService.get(constants.cookieKeys.TOKEN);
    }

    saveCurrentUserToken(token: string) {
        this.cookieService.put(constants.cookieKeys.TOKEN, token);
    }

    saveCurrentUser(user: Account) {
        this.cookieService.putObject(constants.cookieKeys.CURRENT_USER, user);
    }

    removeCurrentUserData() {
        this.cookieService.remove(constants.cookieKeys.CURRENT_USER);
        this.cookieService.remove(constants.cookieKeys.TOKEN);
    }

}
