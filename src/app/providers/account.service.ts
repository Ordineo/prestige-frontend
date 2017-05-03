import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment'
import {Http} from '@angular/http'
import {Observable} from 'rxjs/Observable'

@Injectable()
export class AccountService {

  constructor(private _http: Http) {
  }

  login(username: string, password: string) {
    const body = {
      username: username,
      password: password
    };

    return this._http.post(environment.apiLoginEndpoint, body)
      .map(result => {
        sessionStorage.setItem('Authorization', 'Bearer ' + result.text());
        return result;
      })
      .catch((err) => {
        return Observable.throw(err);
      });
  }

  // todo link github account with user from database
  getAccountById(id: number) {
    // return this.af.database.object('/accounts/' + id)
    //     .map(result => (result));
  }

  // todo implement account update function
  /*updateAccount(account: Account) {
   return this.af.database.object('/accounts/' + account.id).set( account);
   }*/
}
