import {Component, OnInit} from '@angular/core';
import {AngularFire, FirebaseObjectObservable} from  'angularfire2';

@Component({
  selector: 'prestige-feed',
  templateUrl: './prestige-feed.component.html',
  styleUrls: ['./prestige-feed.component.scss']
})
export class PrestigeFeedComponent implements OnInit {
  feed: FirebaseObjectObservable<any[]>;

  constructor(af: AngularFire) {
    this.feed = af.database.object('/feed');
  }

  ngOnInit() {
  }

}
