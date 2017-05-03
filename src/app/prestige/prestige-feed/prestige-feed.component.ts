import { Component, OnInit } from '@angular/core';
import { PrestigeService } from "../../providers/prestige.service";
import { Observable } from "rxjs";
import { DatePipe } from "@angular/common";
import { SortDatePipe } from "../../shared/sort/sort-date.pipe";
import { AuthService } from "../../providers/auth.service";
import {Http} from "@angular/http";

@Component({
  selector: 'prestige-feed',
  templateUrl: './prestige-feed.component.html',
  styleUrls: ['./prestige-feed.component.scss']
})
export class PrestigeFeedComponent implements OnInit {

  feed: any;
  prestiges: Observable<any>;
  currentUser: any;
  show: boolean = false;

  constructor(private http: Http,
              private prestigeService: PrestigeService,
              private authService: AuthService) {
    /*af.database.object('/feed').map(res => {
      this.feed = res;
    });*/
    // http.get("localhost:8585/employee-service/prestiges").map(res => {
    //   this.feed = res;
    // });
  }

  avatar = "";


  randomAvatar() {
    var avatar = "";
    var possible = "ABC";
    for (var i = 0; i < 5; i++)
      this.avatar += possible.charAt(Math.floor(Math.random() * possible.length));
    return avatar;
  }

  ngOnInit() {
    // this.prestigeService.getPrestiges().subscribe(res => {
    //   this.prestiges = res.reverse();//res.reverse(); // reverse Firebase data: https://github.com/angular/angularfire2/issues/283#issuecomment-231511751
    //   console.log(res);
    //   this.getCurrentUser();
    // });

    this.prestigeService.get().subscribe(result => {
      this.prestiges = result.endorsements;
      this.getCurrentUser();
    });

    this.avatar = this.randomAvatar();
  }



  public getCurrentUser() {
    this.authService.getProfile().subscribe(user => {
      this.show = true;
      this.currentUser = user;
      console.log(this.currentUser);
    });
  }
}
