import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';

@Component({
    selector: 'app-navigationbar',
    templateUrl: 'navigationbar.component.html',
    styleUrls: ['./navigationbar.component.scss']
})

export class NavigationBarComponent implements OnInit {

    constructor(private authService: AuthService) { }

    ngOnInit() { }

    getLoggedInUsername(): string | undefined {
        return this.authService.loggedInUser ? this.authService.loggedInUser.username : undefined;
    }
}
