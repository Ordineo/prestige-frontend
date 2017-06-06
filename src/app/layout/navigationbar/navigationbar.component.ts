import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { RouterLinkActive } from '@angular/router';


@Component({
    selector: 'app-navigationbar',
    templateUrl: 'navigationbar.component.html',
    styleUrls: ['./navigationbar.component.scss']
})

export class NavigationBarComponent implements OnInit {

    // public rla: RouterLinkActive;

    constructor(private authService: AuthService) { }

    ngOnInit() { }

    getLoggedInUsername(): string | undefined {
        return this.authService.loggedInUser ? this.authService.loggedInUser.username : undefined;
    }
}
