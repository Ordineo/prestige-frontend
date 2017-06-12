import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { UserService } from '../../../services/user.service';


@Component({
    selector: 'app-navigationbar',
    templateUrl: 'navigationbar.component.html',
    styleUrls: ['./navigationbar.component.scss']
})

export class NavigationBarComponent implements OnInit {

    constructor(private userService: UserService) { }

    ngOnInit() { }

    getLoggedInUsername(): string | undefined {
        return this.userService.getCurrentUsername();
    }
}
