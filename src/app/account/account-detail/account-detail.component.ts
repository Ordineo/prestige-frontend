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
    /*this.accountService.getAccountById(0).subscribe(account => {
      this.account = {
        id: account.id,
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        phone: account.phone,
        unit: account.unit,
        gender: account.gender
      }
    })*/
    this.employeeService.getById(1).subscribe(account => {
      this.account = {
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        unit: account.unit,
        phone: account.phone,
        gender: account.gender
      }
    });
  }

  // todo call account update function
  saveAccount() {
    // this.accountService.updateAccount(this.account);
    console.log("THIS HAS TO UPDATE THE ACCOUNT")
    this.dialogRef.close();
  }

}
