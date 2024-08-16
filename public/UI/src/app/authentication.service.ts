import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseURL: string = environment.baseURL + environment.userSubRouteURL;

  constructor(private httpClient: HttpClient) {}

  public getToken(): string | null {
    if (localStorage.getItem(environment.localStoreageTokenKey))
      return localStorage.getItem(environment.localStoreageTokenKey);
    else return '';
  }

  public setToken(token: string): void {
    localStorage.setItem(environment.localStoreageTokenKey, token);
  }

  public removeToken(): void {
    localStorage.removeItem(environment.localStoreageTokenKey);
  }

  public hasToken(): boolean {
    if (this.getToken() === '') return false;
    else return true;
  }

  public login(loginObject: any): Observable<any> {
    const apiUrl = this.baseURL + environment.loginSubRouteURL;
    return this.httpClient.post(apiUrl, loginObject);
  }

  public registration(registrationObject: any): Observable<any> {
    const apiUrl = this.baseURL + environment.registerSubRouteURL;
    return this.httpClient.post(apiUrl, registrationObject);
  }
}
