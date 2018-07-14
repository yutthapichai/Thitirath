import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Authsignup, Authlogin } from './auth-data.model';
import { environment } from '../../environments/environment';
import { Subject } from '../../../node_modules/rxjs';

const Backend_url = environment.apiUrl + '/user';

@Injectable({ providedIn: 'root'})

export class AuthService {

  private token: string;
  private userId: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  private Authenticated = false;

  constructor(private http: HttpClient, private router: Router) {}

  getAuth() {
    return this.Authenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(email: string, password: string) {
    const AuthLogin: Authlogin = {
      email: email,
      password: password
    };
    this.http.post<{ token: string, expiresIn: number, userId: string }>
    (Backend_url + '/login', AuthLogin).subscribe(
      Response => {
        this.token = Response.token;
        if (this.token) {
          this.userId = Response.userId;
          this.Authenticated = true;
          this.authStatusListener.next(true);
          const expiresInDuration = Response.expiresIn;
          this.setAutoLogout(expiresInDuration);
          const now = new Date();
          const expirationdate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthbrownser(this.token, expirationdate, this.userId);
          this.router.navigate(['/']);
          console.log('Timeout : ' + expirationdate); // แสดงเวลาปัจจุบันที่จะออกจากระบบ
        }
      }
    );
  }

  signup(firstname: string, lastname: string, email: string, password: string) {
    const AuthSignup: Authsignup = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    };
    this.http.post(Backend_url + '/signup', AuthSignup).subscribe(
      Response => { console.log(Response); }
    );
  }

  logout() {
    this.token  = null;
    this.userId = null;
    this.Authenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthbrownser();
    this.router.navigate(['/login']);
  }

  private setAutoLogout(timeout: number) {
    console.warn('Setting timer : ' + timeout);
    this.tokenTimer = setTimeout(
      () => {
        this.logout();
      }, timeout * 1000
    );
  }

  private saveAuthbrownser(token: string, expirationdate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationdate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthbrownser() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  public autoAuthUser() { // when refresh webpage will get data from brownser
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    } else {
      const now = new Date();
      const expiresIn = authInformation.expirationdate.getTime() - now.getTime();
      if ( expiresIn > 0) {
        this.token = authInformation.token;
        this.Authenticated = true;
        this.userId = authInformation.userId;
        this.setAutoLogout(expiresIn / 1000);
        this.authStatusListener.next(true);
      }
    }
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationdate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if ( !token || !expirationdate) {
      return;
    } else {
      return {
        token: token,
        expirationdate: new Date(expirationdate),
        userId: userId
      };
    }
  }

}
