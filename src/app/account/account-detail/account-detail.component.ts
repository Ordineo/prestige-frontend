import { Component, OnInit } from '@angular/core';
import {Account} from "../../models/account";
import {AccountService} from "../../providers/account.service";
import {MdDialogRef} from "@angular/material";
import {EmployeeService} from "../../providers/employee.service";

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
  account: Account;

  constructor(private accountService: AccountService,
              public dialogRef: MdDialogRef<any>, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getByUsername(sessionStorage.getItem('username')).subscribe(account => {
      this.account = {
        username: sessionStorage.getItem('username'),
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        unit: account.unit,
        phone: account.phone,
        gender: account.gender
      }
    });
  }

  // TODO call account update function
  saveAccount() {
    this.accountService.updateAccount(this.account).subscribe();
    this.dialogRef.close();
  }

}
