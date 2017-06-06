import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { AuthService } from '../../providers/auth.service';
import { AccountDetailComponent } from '../../account/account-detail/account-detail.component';
import { AddPrestigeComponent } from '../../prestige/add-prestige/add-prestige.component';
import { CookieService } from 'ngx-cookie';

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
        private authService: AuthService) { }

    ngOnInit() {
        this.username = this.cookieService.get('username');
    }

    public isUserLoggedIn(): boolean {
        return this.authService.userLoggedIn;
    }

    public getLoggedInUsername(): string | undefined {
        return this.authService.loggedInUser ? this.authService.loggedInUser.username : undefined;
    }

    public getLoggedInUserAvatar(): string | undefined {
        return this.authService.loggedInUser ? this.authService.loggedInUser.avatar : undefined;
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

        this.dialogRef = this.dialog.open(AddPrestigeComponent, config);

        this.dialogRef.afterClosed().subscribe(result => {
            this.dialogRef = null;
            // TODO: reload page
        });
    }

    public logout() {
        this.authService.logout();
    }
}
