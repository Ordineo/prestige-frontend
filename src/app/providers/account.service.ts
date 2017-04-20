import {Injectable} from '@angular/core';
import {Account} from "../models/account";
import {environment} from "../../environments/environment";
import {Http} from "@angular/http";

@Injectable()
export class AccountService {

  constructor(private _http: Http) {
  }

  login(username: string, password: string) {
    let body = {
      username: username,
      password: password
    };

    return this._http.post(environment.apiLoginEndpoint, body)
      .map(result => {
        return result;
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
