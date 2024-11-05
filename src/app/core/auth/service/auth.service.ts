import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthSignInDTO } from '../dto/auth-sign-in-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  signin(authSignInDTO: AuthSignInDTO) {
    return this.httpClient.post<any>(`${environment.api}/api/auth/signin`, authSignInDTO,
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