import { Component, ViewChild } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { AccountDetailComponent } from '../../account/account-detail/account-detail.component';
import { AuthService } from '../../../services/auth.service';
import { AddEndorsementComponent } from '../../endorsements/add-endorsement/add-endorsement.component';
import { UserService } from '../../../services/user.service';
import { EmployeeSearchComponent } from '../../shared/employee-search/employee-search.component';
import { Router } from '@angular/router';
import { Account } from '../../../models/account';

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent {

  @ViewChild('employeeSearch') employeeSearch: EmployeeSearchComponent;
  dialogRef: MdDialogRef<any>;

  constructor(private dialog: MdDialog,
              private authService: AuthService,
              private userService: UserService,
              private router: Router) {
  }

  public isUserLoggedIn(): boolean {
    return this.userService.isUserLoggedIn();
  }

  public getLoggedInUsername(): string | undefined {
    return this.userService.getCurrentUsername();
  }

  public getLoggedInUserAvatar(): string | undefined {
    return this.userService.getCurrentUser() ? this.userService.getCurrentUser().avatar : undefined;
  }

  public openAccountDetail() {
    const config = new MdDialogConfig();
    config.width = '80%';

    this.dialogRef = this.dialog.open(AccountDetailComponent, config);

    this.dialogRef
      .afterClosed()
      .subscribe(() => {
        this.dialogRef = null;
      });
  }

  public openAddEndorsement() {
    const config = new MdDialogConfig();
    config.width = '80%';

    this.dialogRef = this.dialog.open(AddEndorsementComponent, config);

    this.dialogRef
      .afterClosed()
      .subscribe(() => {
        this.dialogRef = null;
      });
  }

  public showEmployeeDetail(employee: Account) {
    this.router.navigate(['/employee-detail', employee.username])
      .then(() => this.employeeSearch.reset());
  }

  public logout(): Promise<boolean> {
    return this.authService.logout();
  }
}
