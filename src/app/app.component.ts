import {Component} from '@angular/core';
import {Router}  from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private router: Router) {
  }

  // todo check status for tabs and routing
  // https://github.com/angular/material2/issues/524#issuecomment-257209955

  public changeTab(at) {
    console.log(at);
    switch (at.index) {
      case 0:
        this.router.navigateByUrl('/prestige-feed');
        break;
      // case 1:
      //   this.router.navigateByUrl('/prestige-detail');
      //   break;
      case 1:
        this.router.navigateByUrl('/employee-ranking');
        break;
      case 2:
        this.router.navigateByUrl('/categories');
        break;
      default:
        console.debug('activeTab is: ', at, 'activeTab.index is: ', at.index);
        break;
    }
  }
}
