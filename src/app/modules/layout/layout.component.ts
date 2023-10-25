import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/_services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  public routerSubscription   : any;
  public activeRoute: any;
  public openSidebar: boolean = false;
  public tooltip: boolean = false;
  public navOpen: boolean = false;
  public mobOpen: boolean = false;
  public pageHeading: any ='Home';
  public appPages = [
  ];
  public user: any = {};
  constructor(
    private router: Router,
    private authenticateService: AuthenticationService,
  ) {
    this.routeCheck();
  }

  ngOnInit(): void {
    this.checkUserLogin();
  }
  checkUserLogin() {
    this.user = this.authenticateService.get_currentUserValue();
    if (this.user.account_type == '1') {
      this.appPages = [{ title: 'Home', url: '/home', icon: 'home' },
      { title: 'Investors Exposure', url: '/global-exposure-manager', icon: 'bar-chart-outline' },
      { title: 'Daily P/L', url: '/eod-table-report-manager', icon: 'cash-outline' },
      { title: 'Trading History', url: '/trading-history-report-manager', icon: 'bulb-outline' },
      { title: 'Investor Accounts', url: '/investor-accounts', icon: 'people-outline' },
      { title: 'Manager P/L', url: '/pf-history', icon: 'cash-outline' },
      { title: 'Wallet', url: '/wallet', icon: 'wallet-outline' },
      { title: 'Requests', url: '/requests', icon: 'git-pull-request-outline' },
      { title: 'Profile', url: '/profile', icon: 'person-circle-outline' }];
    }
    else {
      this.appPages = [
        { title: 'Home', url: '/home', icon: 'home' },
        { title: 'Investors Exposure', url: '/global-exposure-manager', icon: 'bar-chart-outline' },
        { title: 'Daily P/L', url: '/eod-table-report-manager', icon: 'cash-outline' },
        { title: 'Trading History', url: '/trading-history-report-manager', icon: 'bulb-outline' },
        { title: 'Wallet', url: '/wallet', icon: 'wallet-outline' },
        { title: 'Profile', url: '/profile', icon: 'person-circle-outline' }
      ]
    }
  }
  routeCheck() {
    this.routerSubscription = this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        this.activeRoute = val.url;
        if (this.activeRoute === '/home') {
          this.pageHeading = 'Home';
        }
        else if(this.activeRoute === '/global-exposure-manager') {
          this.pageHeading = 'Investor Exposure';
        }
        else if(this.activeRoute === '/eod-table-report-manager') {
          this.pageHeading = 'Daily P/L';
        }
        else if(this.activeRoute === '/trading-history-report-manager') {
          this.pageHeading = 'Trading History';
        }
        else if(this.activeRoute === '/investor-accounts') {
          this.pageHeading = 'Investors Accounts';
        }
        else if(this.activeRoute === '/pf-history') {
          this.pageHeading = 'Manager P/L';
        }
        else if(this.activeRoute === '/wallet') {
          this.pageHeading = 'Wallet';
        }
        else if(this.activeRoute === '/requests') {
          this.pageHeading = 'Requests';
        }
        else if(this.activeRoute === '/profile') {
          this.pageHeading = 'Profile';
        }
      }
    });
  }
  simpleLogout(){
    localStorage.setItem('userEmail', '');
    this.authenticateService.simpleLogout();
  }
}
