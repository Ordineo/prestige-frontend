import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http} from '@angular/http';
import {EndorsementService} from '../../../services/prestige.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-endorsement-feed',
  templateUrl: './endorsement-feed.component.html',
  styleUrls: ['./endorsement-feed.component.scss']
})
export class EndorsementFeedComponent implements OnInit {

  prestiges: Observable<any>;
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
    this.prestiges = this.endorsementService.getPrestiges().share();

    this.endorsementService.subscribeToUpdateEndorsementsEvents(() => {
      this.prestiges = this.endorsementService.getPrestiges().share();
    });

    this.avatar = this.randomAvatar();
  }
}
