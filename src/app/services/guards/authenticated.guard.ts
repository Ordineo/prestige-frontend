import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        const canActivate = this.userService.isUserLoggedIn();
        if (!canActivate) {
            this.router.navigate(['/login']);
        }
        return canActivate;
    }

}
