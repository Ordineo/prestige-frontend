import {Component, OnInit} from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {AccountDetailComponent} from '../../account/account-detail/account-detail.component';
import {CookieService} from 'ngx-cookie';
import {AuthService} from '../../../services/auth.service';
import {AddEndorsementComponent} from '../../endorsements/add-endorsement/add-endorsement.component';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit {

  dialogRef: MdDialogRef<any>;
  username: string;

  constructor(private dialog: MdDialog,
              private cookieService: CookieService,
              private authService: AuthService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.username = this.cookieService.get('username');
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

  public logout() {
    this.authService.logout();
  }
}