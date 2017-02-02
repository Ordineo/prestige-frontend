import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import {Account} from "../models/account";

@Injectable()
export class AccountService {

  constructor(private af: AngularFire) { }

  getAccountById(id: number) {
    return this.af.database.object('/accounts/' + id)
        .map(result => (result));
  }

  updateAccount(account: Account) {
    return this.af.database.object('/accounts/' + account.id).set( account);
  }
}
