import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../entity/user.entity';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = `${environment.api}/api/user/me/all`;

  constructor(private readonly httpClient: HttpClient) {}

  findAll(): Observable<HttpResponse<User[]>> {
    return this.httpClient.get<User[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<User[]>) => {
        return response;
      })
    );
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

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<any>(`${environment.api}/api/user/upload`, formData, {
      observe: 'response',
    });
  }
}