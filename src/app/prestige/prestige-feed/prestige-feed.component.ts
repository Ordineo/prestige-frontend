import {Component, OnInit} from '@angular/core';
import {AngularFire, FirebaseObjectObservable} from  'angularfire2';
import {PrestigeService} from "../../providers/prestige.service";
import {Observable} from "rxjs";
import {DatePipe} from "@angular/common";
import {SortDatePipe} from "../../shared/sort/sort-date.pipe";

@Component({
  selector: 'prestige-feed',
  templateUrl: './prestige-feed.component.html',
  styleUrls: ['./prestige-feed.component.scss']
})
export class PrestigeFeedComponent implements OnInit {

  feed: FirebaseObjectObservable<any[]>;
  prestiges: Observable <any>;

  constructor(af: AngularFire,
              private prestigeService: PrestigeService) {
    af.database.object('/feed').map(res => {
      this.feed = res;
    });
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
    this.prestigeService.getPrestiges().subscribe(res => {
      this.prestiges = res.reverse(); // reverse Firebase data: https://github.com/angular/angularfire2/issues/283#issuecomment-231511751
    });

    this.avatar = this.randomAvatar();
  }

}
