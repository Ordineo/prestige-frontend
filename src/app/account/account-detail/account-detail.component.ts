import { Component, OnInit } from '@angular/core';
import {Account} from "../../models/account";
import {AccountService} from "../../providers/account.service";
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
  account: Account;

  constructor(private accountService: AccountService,
              public dialogRef: MdDialogRef<any>) { }

  ngOnInit() {
    this.accountService.getAccountById(0).subscribe(account => {
      this.account = {
        id: account.id,
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        phone: account.phone,
        unit: account.unit,
        gender: account.gender
      }
    })
  }

  saveAccount() {
    this.accountService.updateAccount(this.account);
    this.dialogRef.close();
  }

}
