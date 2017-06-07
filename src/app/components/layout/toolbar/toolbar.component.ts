import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { AccountDetailComponent } from '../../account/account-detail/account-detail.component';
import { CookieService } from 'ngx-cookie';
import { AuthService } from '../../../services/auth.service';
import { AddEndorsementComponent } from '../../endorsements/add-endorsement/add-endorsement.component';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit {

    dialogRef: MdDialogRef<any>;
    username: string;

    constructor(private router: Router,
        private dialog: MdDialog,
        private viewContainerRef: ViewContainerRef,
        private cookieService: CookieService,
        private authService: AuthService,
        private userService: UserService) { }

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
        config.viewContainerRef = this.viewContainerRef;
        config.width = '80%';

        this.dialogRef = this.dialog.open(AccountDetailComponent, config);

        this.dialogRef.afterClosed().subscribe(result => {
            this.dialogRef = null;
        });
    }

    public openAddPrestige() {
        const config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        config.width = '80%';

        this.dialogRef = this.dialog.open(AddEndorsementComponent, config);

        this.dialogRef.afterClosed().subscribe(result => {
            this.dialogRef = null;
            // reload endorsements
        });
    }

    public logout() {
        this.authService.logout();
    }
}
