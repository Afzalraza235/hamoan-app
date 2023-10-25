import { Injectable, Inject, PLATFORM_ID  } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppSettings } from './app.setting';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

declare var config: any;

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject : BehaviorSubject<any>;
    // public  currentUser        : Observable<any>;
    public  currentUser        : any;
    public  UserLoginKey       : any;
    public  corsHeaders        : any;

    public isBrowser = new BehaviorSubject<boolean>(null);

    private currentUserS: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    currentUserS$: Observable<any> = this.currentUserS.asObservable();

    constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any, private router: Router) {

      // Set if its on browser or server
      this.isBrowser.next(isPlatformBrowser(platformId));

      if(typeof localStorage != 'undefined') {
          // Get user data
          if (JSON.parse(localStorage.getItem('currentUser'))) {
            if(typeof JSON.parse(localStorage.getItem('currentUser'))['sessionTimeout'] == "undefined") {
              this.simpleLogout();
            }
            this.currentUser  = JSON.parse(localStorage.getItem('currentUser'))['user'];
            this.currentUserS.next(this.currentUser);

            //check if past expiration date
            let sessionTimeout = JSON.parse(localStorage.getItem('currentUser'))['sessionTimeout'];
            if (new Date(sessionTimeout) < new Date()) {
              this.simpleLogout();
            }
          }

          // Get User login Key
          if (JSON.parse(localStorage.getItem('UserLoginKey'))) {
            this.UserLoginKey = JSON.parse(localStorage.getItem('UserLoginKey'));
          }
      } else {
          this.currentUser = null;
          this.currentUserS.next(this.currentUser);
      }
    }

    public get_currentUserValue(): any {
        return this.currentUser;
    }

    public setCurrentUserValue(user): any {
      let data         = {};
          data['user'] = user;
      let timeout      = new Date();
      timeout.setHours(timeout.getHours() + 12); // 12 hrs of session
      data['sessionTimeout'] = timeout.toString();
      try {
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.currentUser = user;
        this.currentUserS.next(this.currentUser);
      }
      catch (e) {

      }
    }

    public get_UserLoginKey(): any {
        return this.UserLoginKey;
    }

    public setUserLoginKey(key): any {
      try {
        localStorage.setItem('UserLoginKey', JSON.stringify(key));
        this.UserLoginKey = key;
      }
      catch (e) {

      }
    }

    login(username, password) {
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    simpleLogout() {
      if(typeof localStorage != 'undefined') {
        // Remove From Session
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        this.currentUserS.next(this.currentUser);
        this.router.navigate(['auth/login']);
      }
    }

    logout(): Promise<any> {
      let url  = AppSettings.API_ENDPOINT + 'admin.php?action=logout&User_id=' + this.currentUser.id;

      return this.http.get(url).toPromise()
          .then( resp => {
              // remove user from local storage and set current user to null
              // localStorage.removeItem('currentUser');
              // this.currentUser = null;

              // Remove From Session
              localStorage.removeItem('currentUser');
              this.currentUser = null;
              this.currentUserS.next(this.currentUser);

              return true;
          })
          .catch(this.handleErrorPromise);
    }

    handleErrorPromise (error: Response | any) {
      console.log("Error: ", error);
      console.log("Error: ", error.message);
      return Promise.reject(error.error);
    }
}
