import {Component, ViewContainerRef, OnInit} from '@angular/core';
import {Router}  from '@angular/router';
import {MdDialog, MdDialogConfig, MdDialogRef} from "@angular/material";
import {AccountDetailComponent} from "./account/account-detail/account-detail.component";
import {AddPrestigeComponent} from "./prestige/add-prestige/add-prestige.component";
import {gatekeeperConfig} from "./node.config";
import {AuthService} from "./providers/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  dialogRef: MdDialogRef<any>;
  username: string;

  constructor(private router: Router,
              public dialog: MdDialog,
              public viewContainerRef: ViewContainerRef,
              public authService: AuthService) {
  }

  public openAccountDetail() {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    config.width = '80%';

    this.dialogRef = this.dialog.open(AccountDetailComponent, config);

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }

  public openAddPrestige() {
    let config = new MdDialogConfig();
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

  ngOnInit(){
    this.username = sessionStorage.getItem('username');
  }

}
