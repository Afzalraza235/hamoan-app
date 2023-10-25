import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let activateRoute = true;
        this.authenticationService.isBrowser.subscribe(isBrowser => {
          if (isBrowser) {
              const currentUser = this.authenticationService.get_currentUserValue();
              // console.log("*********** currentUser: ",currentUser);
              if (currentUser) {
                  // // authorised so return true
                  // return true;

                  activateRoute = true;
              } else {
                  // not logged in so redirect to login page with the return url
                  // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
                  this.router.navigate(['/login']);

                  // return false;
                  activateRoute = false;
              }
          } else {
              // console.log("********* Inside Server State ");
          }
        });

        return activateRoute;
    }
}
