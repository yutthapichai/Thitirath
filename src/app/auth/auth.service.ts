import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Authsignup } from './auth-data.model';
import { environment } from '../../environments/environment';

const Backend_url = environment.apiUrl + '/user';

@Injectable({ providedIn: 'root'})

export class AuthService {

  constructor(private http: HttpClient) {}

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
}
