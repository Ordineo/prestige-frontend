import { Injectable } from '@angular/core';
import {Account} from "../models/account";

@Injectable()
export class AccountService {

  constructor() { }

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
