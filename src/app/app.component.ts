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
  private activeTabIndex = 0;

  constructor(private router: Router,
              public dialog: MdDialog,
              public viewContainerRef: ViewContainerRef,
              private authService: AuthService) {
  }

  githubUrl = 'https://github.com/login/oauth/authorize?client_id=' + gatekeeperConfig.development.client_id + '&scope=user&redirect_uri=' + gatekeeperConfig.development.redirect_uri;
  

  // todo check status for tabs and routing
  // https://github.com/angular/material2/issues/524#issuecomment-257209955

  public changeTab(at) {
    switch (at.index) {
      case 0:
        this.router.navigateByUrl('/prestige-feed');
        break;
      // change this with ID of loggedin user
      case 1:
        this.router.navigateByUrl('/employee-detail/0');
        break;
      case 2:
        this.router.navigateByUrl('/employee-ranking');
        break;
      default:
        console.debug('activeTab is: ', at, 'activeTab.index is: ', at.index);
        break;
    }
  }

  public switchToFirstTab() {
    this.activeTabIndex = 0;
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
    });
  }

  public logout() {
    this.authService.logout();
  }
  
  ngOnInit(){}

}
