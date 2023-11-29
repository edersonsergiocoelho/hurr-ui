import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/commom/app.constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  signin(user: any) {
    return this.httpClient.post<any>(`${environment.api}/api/auth/signin`, user,
    {
      observe: 'response',
    });
  }

  signup(user: any) {
    return this.httpClient.post<any>(`${environment.api}/api/auth/signup`, user,
    {
      observe: 'response',
    });
  }

}