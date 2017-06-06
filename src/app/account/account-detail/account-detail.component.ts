import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account';
import { AccountService } from '../../providers/account.service';
import { MdDialogRef } from '@angular/material';
import { EmployeeService } from '../../providers/employee.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
  account: Account;

  constructor(private accountService: AccountService,
    private cookieService: CookieService,
    public dialogRef: MdDialogRef<any>,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService
      .getByUsername(this.cookieService.get('username'))
      .subscribe(account => {
        this.account = {
          username: this.cookieService.get('username'),
          firstName: account.firstName,
          lastName: account.lastName,
          email: account.email,
          unit: account.unit,
          phone: account.phone,
          gender: account.gender,
          avatar: account.avatar
        }
      });
  }

  // TODO call account update function
  saveAccount() {
    this.accountService.updateAccount(this.account).subscribe();
    this.dialogRef.close();
  }

}
