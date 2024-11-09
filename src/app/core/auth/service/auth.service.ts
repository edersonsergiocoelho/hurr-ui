import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthSignInDTO } from '../dto/auth-sign-in-dto.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = `${environment.api}/api/auth`;

  constructor(private readonly httpClient: HttpClient) {}

  signin(authSignInDTO: AuthSignInDTO): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/signin`;
    return this.httpClient.post<any>(url, authSignInDTO, { observe: 'response' });
  }

  signup(user: any): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/signup`;
    return this.httpClient.post<any>(url, user, { observe: 'response' });
  }
}