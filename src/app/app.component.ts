import {Component, ViewContainerRef} from '@angular/core';
import {Router}  from '@angular/router';
import {MdDialog, MdDialogConfig, MdDialogRef} from "@angular/material";
import {AccountDetailComponent} from "./account/account-detail/account-detail.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  dialogRef: MdDialogRef<any>;

  constructor(private router: Router,
              public dialog: MdDialog,
              public viewContainerRef: ViewContainerRef) {
  }

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
      case 3:
        this.router.navigateByUrl('/categories');
        break;
      default:
        console.debug('activeTab is: ', at, 'activeTab.index is: ', at.index);
        break;
    }
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
}
