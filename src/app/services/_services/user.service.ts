import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from './app.setting';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry, finalize, tap, map } from 'rxjs/operators';

declare var config: any;

@Injectable({ providedIn: 'root' })
export class UserService {
    public corsHeaders: any = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });;

    constructor(private http: HttpClient) { }

    login(user: any): Promise<any> {
        let url = AppSettings.API_ENDPOINT + 'auth/login';
        // return this.http.post(url, user, this.corsHeaders);

        return this.http.post(url, user, this.corsHeaders).toPromise()
            // .then(this.extractData)
            .then( user => {
                return user;
     		    })
            .catch(this.handleErrorPromise);
    }

    register(user: any): Promise<any> {
        let url = AppSettings.API_ENDPOINT + 'auth/signup';
        // return this.http.post(url, user, this.corsHeaders);

        return this.http.post(url, user, this.corsHeaders).toPromise()
            // .then(this.extractData)
            .then( user => {
                return user;
     		    })
            .catch(this.handleErrorPromise);
    }

    socialLoginRegister(user: any): Promise<any> {
        let url = AppSettings.API_ENDPOINT + 'auth/socailSignup';

        return this.http.post(url, user, this.corsHeaders).toPromise()
            .then( user => {
                return user;
     		    })
            .catch(this.handleErrorPromise);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }

    extractData(res: Response) {
      let body = res.json();
      return body || {};
    }

    handleErrorPromise (error: Response | any) {
      console.log("Error: ", error);
      console.log("Error: ", error.message);
      return Promise.reject(error.error);
    }

    private handleErrorObservable (error: Response | any) {
    	console.error(error.message || error);
    	return Observable.create(error.message || error);
    }
}
