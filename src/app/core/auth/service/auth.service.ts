import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  signin(user: User) {
    return this.httpClient.post<User>(`${environment.api}/api/auth/signin`, user,
    {
      observe: 'response',
    });
  }

  signup(user: User) {
    return this.httpClient.post<User>(`${environment.api}/api/auth/signup`, user,
    {
      observe: 'response',
    });
}