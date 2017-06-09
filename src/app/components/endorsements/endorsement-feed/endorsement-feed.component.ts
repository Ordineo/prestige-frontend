import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {EndorsementService} from '../../../services/endorsement.service';
import {UserService} from '../../../services/user.service';
import {Endorsement} from '../../../models/endorsement';

@Component({
  selector: 'app-endorsement-feed',
  templateUrl: './endorsement-feed.component.html',
  styleUrls: ['./endorsement-feed.component.scss']
})
export class EndorsementFeedComponent implements OnInit {

  endorsements: Observable<Endorsement[]>;
  currentUser: any;
  avatar = '';

  constructor(
    private endorsementService: EndorsementService,
    private userService: UserService) {
  }

  randomAvatar() {
    const avatar = '';
    const possible = 'ABC';
    for (let i = 0; i < 5; i++) {
      this.avatar += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return avatar;
  }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.endorsements = this.endorsementService.getEndorsements().share();

    this.endorsementService.subscribeToUpdateEndorsementsEvents(() => {
      this.endorsements = this.endorsementService.getEndorsements().share();
    });

    this.avatar = this.randomAvatar();
  }
}
