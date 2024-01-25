import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Role } from '../entity/role.entity';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private readonly apiUrl = `${environment.api}/role`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(id: string): Observable<HttpResponse<Role>> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Role>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<Role>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<Role[]>> {
    return this.httpClient.get<Role[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<Role[]>) => {
        return response;
      })
    );
  }

  searchPage(roleName: string, enabled: boolean | null, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/search/page`;

    const enabledString = enabled !== null ? enabled.toString() : '';

    let params = new HttpParams()
    .set('roleName', roleName)
    .set('enabled', enabledString)
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sortDir', sortDir);

    if (typeof sortBy === 'string') {
      params = params.set('sortBy', sortBy);
    } else if (Array.isArray(sortBy) && sortBy.length > 0) {
      params = params.set('sortBy', sortBy.join(','));
    }

    return this.httpClient.get<any>(url, { params, observe: 'response' });
  }

  save(role: Role): Observable<HttpResponse<Role>> {
    return this.httpClient.post<Role>(this.apiUrl, role, { observe: 'response' }).pipe(
      map((response: HttpResponse<Role>) => {
        return response;
      })
    );
  }

  update(role: Role): Observable<HttpResponse<Role>> {
    const url = `${this.apiUrl}/${role.roleId}`;
    return this.httpClient.put<Role>(url, role, { observe: 'response' }).pipe(
      map((response: HttpResponse<Role>) => {
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