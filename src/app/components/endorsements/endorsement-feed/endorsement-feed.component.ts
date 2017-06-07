import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DatePipe } from '@angular/common';
import { Http } from '@angular/http';
import { EndorsementService } from '../../../services/prestige.service';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-endorsement-feed',
  templateUrl: './endorsement-feed.component.html',
  styleUrls: ['./endorsement-feed.component.scss']
})
export class EndorsementFeedComponent implements OnInit {

  feed: any;
  prestiges: Observable<any>;
  currentUser: any;
  avatar = '';

  constructor(private http: Http,
    private prestigeService: EndorsementService,
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
    this.prestiges = this.prestigeService.getPrestiges().share();
    this.prestigeService.subscribeToUpdateEndorsementsEvents(() => {
      this.prestiges = this.prestigeService.getPrestiges().share();
    });

    this.avatar = this.randomAvatar();
  }
}
