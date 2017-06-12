import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {EmployeeService} from '../../../services/employee.service';
import {Account} from '../../../models/account';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {

  public account: Account;

  constructor(
    private userService: UserService,
    public dialogRef: MdDialogRef<any>,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService
      .getByUsername(this.userService.getCurrentUsername())
      .subscribe((account: Account) => this.account = account);
  }

  saveAccount() {
    this.employeeService
      .updateAccount(this.account)
      .subscribe(() => this.dialogRef.close(), () => {});
  }

}
