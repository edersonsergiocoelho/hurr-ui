import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { 
  }

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

  getCurrentUser(): Observable<any> {
    return this.httpClient.get<any>(`${environment.api}/api/user/me`, 
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response',
    });
  }
}