import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRole } from '../entity/user-role.entity';
import { UserRoleSearchDTO } from '../dto/user-role-search-dto';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  private readonly apiUrl = `${environment.api}/user-role`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(id: string): Observable<HttpResponse<UserRole>> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<UserRole>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<UserRole>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<UserRole[]>> {
    return this.httpClient.get<UserRole[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<UserRole[]>) => {
        return response;
      })
    );
  }

  searchPage(userRoleSearchDTO: UserRoleSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, userRoleSearchDTO, { params, observe: 'response' });
  }

  save(userRole: UserRole): Observable<HttpResponse<UserRole>> {
    return this.httpClient.post<UserRole>(this.apiUrl, userRole, { observe: 'response' }).pipe(
      map((response: HttpResponse<UserRole>) => {
        return response;
      })
    );
  }

  update(userId: string, roleId: string, userRole: UserRole): Observable<HttpResponse<UserRole>> {
    const url = `${this.apiUrl}/${userId}/${roleId}`;
    return this.httpClient.put<UserRole>(url, userRole, { observe: 'response' }).pipe(
      map((response: HttpResponse<UserRole>) => {
        return response;
      })
    );
  }

  delete(userId: string, roleId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${userId}/${roleId}`;
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