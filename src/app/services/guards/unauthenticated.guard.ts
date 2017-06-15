import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../user.service';

@Injectable()
export class UnauthenticatedGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const canActivate = !this.userService.isUserLoggedIn();
    if (!canActivate) {
      this.router.navigate(['/endorsement-feed']);
    }
    return canActivate;
  }

}
