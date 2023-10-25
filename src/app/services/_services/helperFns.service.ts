import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { AppSettings } from './app.setting';
import { BehaviorSubject, Observable, throwError, Subject } from 'rxjs';
import { catchError, retry, finalize, tap, map, takeUntil } from 'rxjs/operators';

declare var config: any;

@Injectable({ providedIn: 'root' })
export class HelperService {
    public corsHeaders: any = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });

    public searchParms : any;

    // Https Params
    protected ngUnsubscribe: Subject<void> = new Subject<void>();
    public httpLoading     = false;

    constructor(
      private http: HttpClient,
      private authenticationService: AuthenticationService,
    ) {
        if(typeof localStorage != "undefined") {
          // Set Params OnLoad
          this.searchParms = JSON.parse(localStorage.getItem('searchParms'));

          this.corsHeaders = {};
          this.corsHeaders = {
                      headers: new HttpHeaders()
                        .set('Cache-Control',  'no-cache, no-store, must-revalidate, post- check=0, pre-check=0')
                        .set('Pragma',   'no-cache')
                        .set('Expires',  '0')
                        // .set('Authorization',  `Bearer ${user.access_token}`)
                    }
        }

        // let subscription = this.authenticationService.currentUserS$.subscribe(user => {            
        //   if (user) {
        //       this.corsHeaders = {
        //             headers: new HttpHeaders()
        //             //   .set('Content-Type',  'application/json')
        //             //   .set('Accept',  'application/json')
        //             .set('Cache-Control',  'no-cache, no-store, must-revalidate, post- check=0, pre-check=0')
        //             .set('Pragma',   'no-cache')
        //             .set('Expires',  '0')
        //             .set('Authorization',  `Bearer ${user.token}`)
        //           }
        //   } else {
        //       this.corsHeaders = {};
        //         this.corsHeaders = {
        //                 headers: new HttpHeaders()
        //                 .set('Cache-Control',  'no-cache, no-store, must-revalidate, post- check=0, pre-check=0')
        //                 .set('Pragma',   'no-cache')
        //                 .set('Expires',  '0')
        //             }
        //   }
        // });
    }

    //////////////////////////////////////////
    /********* HTTP Requests Fns ***********/
    ////////////////////////////////////////
    httpGetRequests(url): Promise<any> {
        // Set loader true
        this.httpLoading = true;

        return this.http.get(url, this.corsHeaders)
            .pipe( takeUntil(this.ngUnsubscribe) )
            .toPromise()
            .then( resp => {
                // Set loader false
                this.httpLoading = false;

                return resp;
                // console.log("resp: ",resp);
            })
            .catch(error => {
                // Set loader false
                this.httpLoading = false;
                console.log("helperFunc error: ",error);

                // Show Error Msg
                if(typeof error.error != "undefined") {
                    if(error.error.message == "Unauthenticated.") {
                      this.authenticationService.logout();
                    }

                    throw error;
                } else {
                    throw "Something went wrong. Please try again.";
                }
            });
      }

      httpPostRequests(url, data): Promise<any> {
          // Set loader true
          this.httpLoading = true;

          return this.http.post(url, data, this.corsHeaders)
              .pipe( takeUntil(this.ngUnsubscribe) )
              .toPromise()
              .then( resp => {
                  // Set loader false
                  this.httpLoading = false;
                  return resp;
              })
              .catch(error => {
                  // Set loader false
                  this.httpLoading = false;
                  console.log("error: ",error);

                  // Show Error Msg
                  if(typeof error.error != "undefined") {
                      if(error.error.message == "Unauthenticated.") {
                        this.authenticationService.logout();
                      }

                      throw error;
                  } else {
                      throw "Something went wrong. Please try again.";
                  }
              });
        }

      httpDeleteRequests(url): Promise<any> {
          // Set loader true
          this.httpLoading = true;

          return this.http.delete(url, this.corsHeaders)
              .pipe( takeUntil(this.ngUnsubscribe) )
              .toPromise()
              .then( resp => {
                  // Set loader false
                  this.httpLoading = false;
                  return resp;
              })
              .catch(error => {
                  // Set loader false
                  this.httpLoading = false;

                  console.log("error: ",error);

                  // Show Error Msg
                  if(typeof error.error != "undefined") {
                      if(error.error.message == "Unauthenticated.") {
                        this.authenticationService.logout();
                      }

                      throw error;
                  } else {
                      throw "Something went wrong. Please try again.";
                  }
              });
        }
}
