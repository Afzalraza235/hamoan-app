import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService, HelperService } from './services/_services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public isLoggedIn: boolean = true;
  public routerSubscription   : any;
  public activeRoute: any;
  public user: any;
  public loading: boolean = false;
  constructor(
    private router: Router
  ) {
    this.routerSubscription = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.activeRoute = val.url;
        if (this.activeRoute.includes('auth') || this.activeRoute === '/') {
          this.isLoggedIn = false;
        }
        else{
          this.isLoggedIn = true;
        }
      }
    });
  }
}
