import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-navigationbar',
  templateUrl: 'navigationbar.component.html',
  styleUrls: ['./navigationbar.component.scss']
})

export class NavigationBarComponent {

  constructor(private userService: UserService) {
  }

  getLoggedInUsername(): string | undefined {
    return this.userService.getCurrentUsername();
  }
}
