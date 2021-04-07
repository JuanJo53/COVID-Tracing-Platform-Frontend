// import { LoginUser } from "./../../shared/models/login-user";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Client } from "src/app/shared/models/client";
import apiKey from '../apiKey';
import { LoginUser } from 'src/app/shared/models/login-user';
import { User } from 'src/app/shared/models/user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authURL = apiKey.api + '/oauth/token';

  constructor(private httpClient: HttpClient) {}

  // public signUp(newUser: Client): Observable<any> {
  //   return this.httpClient.post<any>(this.authURL + 'new', newUser);
  // }

  public logIn(logInUser: LoginUser): Observable<any> {
    const credenciales = btoa(
      'covidtracerapp' + ':' + 'covidtracerplatform12345'
    );
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + credenciales,
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', logInUser.username);
    params.set('password', logInUser.password);
    // var userParams = params.toString().replace(/%40/gi, '@');

    return this.httpClient.post<any>(this.authURL, params.toString(), {
      headers: httpHeaders,
    });
  }

  createUser(user: User) {
    return this.httpClient.post(apiKey.api + '/client', user);
  }
}
