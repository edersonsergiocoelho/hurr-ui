import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../entity/user.entity';
import { UserSearchDTO } from '../dto/user-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private readonly apiUrl = `${environment.api}/api/user/me/all`;
  private readonly apiUrl = `${environment.api}/user`;

  constructor(private readonly httpClient: HttpClient) {}

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

  //
  findById(id: string): Observable<HttpResponse<User>> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<User>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<User>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<User[]>> {
    return this.httpClient.get<User[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<User[]>) => {
        return response;
      })
    );
  }

  searchPage(userSearchDTO: UserSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/search/page`;

    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sortDir', sortDir);

    if (typeof sortBy === 'string') {
      params = params.set('sortBy', sortBy);
    } else if (Array.isArray(sortBy) && sortBy.length > 0) {
      params = params.set('sortBy', sortBy.join(','));
    }

    return this.httpClient.post<any>(url, userSearchDTO, { params, observe: 'response' });
  }

  save(user: User): Observable<HttpResponse<User>> {
    return this.httpClient.post<User>(this.apiUrl, user, { observe: 'response' }).pipe(
      map((response: HttpResponse<User>) => {
        return response;
      })
    );
  }

  update(user: User): Observable<HttpResponse<User>> {
    const url = `${this.apiUrl}/${user.userId}`;
    return this.httpClient.put<User>(url, user, { observe: 'response' }).pipe(
      map((response: HttpResponse<User>) => {
        return response;
      })
    );
  }

  delete(id: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<void>(url, { observe: 'response' }).pipe(
      catchError((error: any) => {
        if (error.status === 404) {
          return of(null);
        } else {
          throw error;
        }
      })
    );
  }
}